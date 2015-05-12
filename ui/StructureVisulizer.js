const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const Gdk = imports.gi.Gdk;
const Gtk = imports.gi.Gtk;

Gio.resources_register(Gio.resource_load('org.gnome.Gnometa.gresource'));

const CompilerView = imports.CompilerView;
const OutputView = imports.OutputView;
const SplitView = imports.SplitView;
const TextView = imports.TextView;
const Options = imports.options;
const UiHelper = imports.UiHelperClient;
const Utils = imports.Utils;

// Options:
const CmdOptions = [
  {
    name: 'compiler',
    shortName: 'c',
    requireArgument: true,
    defaultValue: null,
    help: 'Compiler to use',
  },
  {
    name: 'input',
    shortName: 'i',
    requireArgument: true,
    defaultValue: null,
    help: 'Input to give to the compiler',
  },
  {
    name: 'help',
    shortName: 'h',
    requireArgument: false,
    defaultValue: false,
    help: 'Print this screen',
  }
];

let start = function() {
  let config = Options.parseArguments(CmdOptions, ARGV);

  if (config.options.help) {
    Options.printHelp('gnometa', CmdOptions);
    return -1;
  }

  UiHelper.start();

  // Source mapping
  const OMetaMap = JSON.parse(Utils.loadFile('standalone.js.map'));

  let _ometaFiles = {};
  let ometaCode = function(filename, start, stop) {
    if (!_ometaFiles[filename]) {
      _ometaFiles[filename] = Utils.loadFile('../' + filename);
    }
    return _ometaFiles[filename].slice(start, stop).trim();
  };

  let ometaLabel = function(id) {
    let sitem = OMetaMap.map[id];
    let filename = OMetaMap.filenames[sitem[0]];
    return [filename, Utils.loadFile('../' + filename), sitem[1], sitem[2]];
  };

  // Structure tree
  let _structureTreeIdx = -1;

  //
  Gtk.init(null, null);

  //
  let builder = Gtk.Builder.new_from_resource('/org/gnome/Gnometa/ui.ui');
  let widget = function(name) { return builder.get_object(name); };


  let paned = new SplitView.SplitView();
  widget('main-paned').add1(paned);
  //widget('main-paned').position = 200;

  let textview = new TextView.TextView();
  paned.addWidget(new Gtk.ScrolledWindow({ child: textview }));

  let compilerview = new CompilerView.CompilerView();
  compilerview.hide();
  widget('main-paned').add2(compilerview);

  let structview = new OutputView.OutputView();
  paned.addWidget(structview);

  //
  textview.onChange(function(text) {
    let data = { name: 'OMeta',
                 rule: 'topLevel',
                 input: text,
                 output: 'view0', };
    UiHelper.executeCommand('translate', data, function(error, ret) {
      if (error) {
        textview.hightlightRange('error', error.idx, text.length - 1);
        return;
      }
      textview.removeHighlightRange('error');
    }.bind(this));
  }.bind(this));

  textview.connect('offset-changed', function(wid, offset) {
    let data = { input: 'view0', output: 'view0', offset: { start: offset, end: offset }, };
    UiHelper.executeCommand('match-structure', data, function(error, ret) {
      if (error) {
        log(error);
        return;
      }
      UiHelper.executeCommand('get-best-match', { input: 'view0' }, function(error, ret) {
        if (error) {
          log(error);
          return;
        }
        let  [idx, match] = ret;
        _structureTreeIdx = idx;
        textview.hightlightRange('highlight', match.start.idx, match.stop.idx);
        compilerview.setData.apply(compilerview, ometaLabel(match.id));
        structview.setData(match.value);
      }.bind(this));
    }.bind(this));
  }.bind(this));
  textview.connect('selection-changed', function(wid, startOffset, endOffset) {
    let data = { input: 'view0', output: 'view0', offset: { start: startOffset, end: endOffset }, };
    UiHelper.executeCommand('match-structure', data, function(error, ret) {
      textview.removeSelection();
      if (error) {
        log(error);
        return;
      }
      _structureTreeIdx = 0;
      UiHelper.executeCommand('get-match', { input: 'view0', index: _structureTreeIdx }, function(error, match) {
        if (error) {
          log(error);
          return;
        }
        textview.hightlightRange('highlight', match.start.idx, match.stop.idx);
        compilerview.setData.apply(compilerview, ometaLabel(match.id));
        structview.setData(match.value);
      }.bind(this));
    }.bind(this));
  });

  textview.connect('alternate-menu', function(wid, startOffset, endOffset) {
    let data = { input: 'view0', output: 'view0', offset: { start: startOffset, end: endOffset }, };
    UiHelper.executeCommand('match-structure', data, function(error, ret) {
      if (error) {
        log(error);
        return;
      }
      UiHelper.executeCommand('get-best-match', { input: 'view0' }, function(error, ret) {
        if (error) {
          log(error);
          return;
        }
        let  [idx, match] = ret;
        _structureTreeIdx = idx;
        textview.hightlightRange('highlight', match.start.idx, match.stop.idx);
        compilerview.setData.apply(compilerview, ometaLabel(match.id));
        compilerview.show();
        structview.setData(match.value);
      }.bind(this));
    }.bind(this));
  }.bind(this));

  compilerview.connect('rule-move', function(wid, way) {
    _structureTreeIdx += way;
    UiHelper.executeCommand('get-match', { input: 'view0', index: _structureTreeIdx }, function(error, match) {
      if (error) {
        log(error);
        return;
      }
      textview.hightlightRange('highlight', match.start.idx, match.stop.idx);
      compilerview.setData.apply(compilerview, ometaLabel(match.id));
      textview.hightlightRange('highlight', match.start.idx, match.stop.idx);
      structview.setData(match.value);
    }.bind(this));
  }.bind(this));

  //
  let source = Utils.loadFile(config.options.input);
  textview.setData(source);

  //
  let win = widget('main-window');
  win.set_titlebar(widget('titlebar'));
  widget('close-button').connect('clicked', (function() { win.hide(); Gtk.main_quit(); }).bind(this));
  win.connect('key-press-event', function(w, event) {
    let keyval = event.get_keyval()[1];
    switch (keyval) {
    case Gdk.KEY_F5: paned.removeLastWidget(); break;
    case Gdk.KEY_F6: paned.addWidget(new OutputView.OutputView()); break;
    case Gdk.KEY_F7: paned.shrinkFocusedChild(10); break;
    case Gdk.KEY_F8: paned.growFocusedChild(10); break;
    case Gdk.KEY_Escape: compilerview.hide(); break;
    }
    return false;
  }.bind(this));
  win.resize(800, 600);
  win.show();

  Gtk.main();
};

start();
