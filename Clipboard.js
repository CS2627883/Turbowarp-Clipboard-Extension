class ClipboardExtension {
  haspermission  = false;
  permissionasked  = false;
  getInfo() {
    return {
      id: 'cs2627883Clipboard',
      name: 'Clipboard',
      blocks: [
        {

          opcode: 'copyClipboard',
          blockType: Scratch.BlockType.COMMAND,
          text: 'copy [CONTENT] to clipboard | non-text content?  [NONTEXT]',
          arguments: {
			CONTENT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hi!'
			},
			NONTEXT: {
              type: Scratch.ArgumentType.BOOLEAN,
              defaultValue: false
            }
          }
        },
        {
          opcode: 'pasteClipboard',
          blockType: Scratch.BlockType.REPORTER,
          text: 'read clipboard (ignoring max clipboard length of: [MAXLENGTH])  | non-text content?  [NONTEXT]',
          arguments: {
            MAXLENGTH: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '1000'
            },
			NONTEXT: {
              type: Scratch.ArgumentType.BOOLEAN,
              defaultValue: false
            }
          }
          },
          {
          opcode: 'hasclipboardreadpermissionpermission',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'clipboard read permission',
          arguments: {
			}
    },
    {
		  opcode: 'hasclipboardwritepermissionpermission',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'clipboard write permission',
          arguments: {
			}
    },
    {
          opcode: 'askclipboardreadpermission',
          blockType: Scratch.BlockType.COMMAND,
          text: 'request clipboard read permission',
          arguments: {
            }
          },
          {
		  opcode: 'askclipboardwritepermission',
          blockType: Scratch.BlockType.COMMAND,
          text: 'request clipboard write permission',
          arguments: {
            }
        },
      ]
    };
  }

  _getpermission(permissiontype,ask) {
    if (permissiontype.permission === "granted") {
    return(true)
  } else if (permissiontype.permission !== "denied" && ask) {
    permissiontype.requestPermission().then((permission) => {
      if (permission === "granted") {
        return(true)
      }
    });
  }
  return(false)
}

	copyClipboard(args) {
	  if (this._getpermission(clipboardRead,true)) {
		if (Boolean(args.NONTEXT) == true) {
			navigator.clipboard.write(String(args.CONTENT))
		} else {
			navigator.clipboard.writeText(String(args.CONTENT))
		}
  }
}
	pasteClipboard(args) {
    if (this._getpermission(clipboardRead,true)) {
      if (Boolean(args.NONTEXT) == true) {
			navigator.clipboard.read()
		} else {
			navigator.clipboard.readText()
		}
        const clipboardcontents = String(navigator.clipboard.read());
        if (length(clipboardcontents) > args.MAXLENGTH) {
          return("[Clipboard length too long]");
        } else {
	        return(clipboardcontents);
        }
    } else {
      return("[Clipboard permission denied");
    }
  }
  askclipboardreadpermission(args) {
    this._getpermission(clipboardRead,true);
  }
  askclipboardwritepermission(args) {
    this._getpermission(clipboardWrite,true);
  }
  hasclipboardreadpermission(args) {
	  return(this._getpermission(clipboardRead,false));
  }
  hasclipboardwritepermission(args) {
	  return(this._getpermission(clipboardWrite,false));
  }
}

Scratch.extensions.register(new ClipboardExtension());
