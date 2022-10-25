clipboardextension_haspermission = false;
clipboardextension_permissionreason = "no reason given"
clipboardextension_permissionasked = false;

class ClipboardExtension {
  getInfo() {
    return {
      id: 'cs2627883-Clipboard',
      name: 'Clipboard',
      blocks: [
        {
          opcode: 'copyClipboard',
          blockType: Scratch.BlockType.COMMAND,
          text: 'copy [TEXT] to clipboard',
          arguments: {
			    TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hi!'
            }
          },
          opcode: 'pasteClipboard',
          blockType: Scratch.BlockType.REPORTER,
          text: 'paste clipboard (ignoring max clipboard length of: [MAXLENGTH])',
          arguments: {
            MAXLENGTH: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: '1000'
            }
          },
          opcode: 'haspermission',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'clipboard read permission',
          arguments: {
          },
          opcode: 'setpermissionreason',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set reason when requesting clipboard read permission to [REASON]',
          arguments: {
            REASON: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'clipboard is used for autofill suggestions'
            }
          },
          opcode: 'permissionreason',
          blockType: Scratch.BlockType.REPORTER,
          text: 'reason when requesting clipboard read permission',
          arguments: {
          },
          opcode: 'askpermission',
          blockType: Scratch.BlockType.COMMAND,
          text: 'request clipboard read permission with reason [REASON]',
          arguments: {
            REASON: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'clipboard is used for autofill suggestions'
            }
          },
        }
      ]
    };
  }

  _askpermission(reason) {
    if (!permissionasked) {
      return(confirm("This project wants to read your clipboard: " + clipboardextension_permissionreason));
    }
  }

  copyClipboard(args) {
	  navigator.clipboard.writeText(String(args.TEXT));
  }
	pasteClipboard(args) {
    if (!clipboardextension_haspermission) {
      _askpermission(clipboardextension_permissionreason);
    }
    if (clipboardextension_haspermission) {
      try {
        let clipboardcontents = String(navigator.clipboard.read());
        if (length(clipboardcontents) > args.MAXLENGTH) {
          return("[Clipboard length too long");
        } else {
	        return(clipboardcontents);
        }
      } catch {
        return("[Failed to read clipboard]");
      }
    } else {
      return("[Clipboard permission denied");
    }
  }
  askpermission(args) {
	  _askpermission(String(args.REASON));
  }
  permissionreason(args) {
	  return(clipboardextension_permissionreason);
  }
  setpermissionreason(args) {
	  clipboardextension_permissionreason = String(args.REASON);
  }
  haspermission(args) {
	  return(clipboardextension_haspermission);
  }
}

Scratch.extensions.register(new ClipboardExtension());