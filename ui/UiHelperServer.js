const Gio = imports.gi.Gio;
const Mainloop = imports.mainloop;
const UiHelper = imports.UiHelper;
const Utils = imports.Utils;

log('server starting!');

let inputStream = new Gio.UnixInputStream({ fd: 0,
                                            close_fd: false, });
let outpuStream = new Gio.UnixOutputStream({ fd: 1,
                                             close_fd: false, });
let inputDataStream = Gio.DataInputStream.new(inputStream);

let handleCommand = function(cmd) {
  try {
    let data = UiHelper.commands[cmd.op].apply(this, cmd.data);
    cmd.data = data;
    outpuStream.write_all(JSON.stringify(cmd) + '\n', null);
  } catch (error) {
    cmd.data = null;
    cmd.error = { message: error.message, stack: error.stack, idx: error.idx }
    outpuStream.write_all(JSON.stringify(cmd) + '\n', null);
  }
};

let readLine = null, gotLine = null;
gotLine = function(stream, res) {
  let [data, length] = inputDataStream.read_line_finish(res);
  if (length > 0) {
    readLine();
    handleCommand(JSON.parse(data));
  } else
    Mainloop.quit('ui-helper');
};
readLine = function() {
  inputDataStream.read_line_async(0, null, gotLine.bind(this));
};

readLine();
Mainloop.run('ui-helper');
