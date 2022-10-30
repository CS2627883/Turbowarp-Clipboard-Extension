clipboardextension_haspermission = false;
clipboardextension_permissionreason = "no reason given"
clipboardextension_permissionasked = false;

class ClipboardExtension {
  haspermission  = false;
  permissionreason = "no reason given"
  permissionasked  = false;
  getInfo() {
    return {
      id: 'cs2627883Clipboard',
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
    if (!this._permissionasked) {
      const choice = confirm("This project wants to read your clipboard: " + this._permissionreason);
      this._permissionreason = choice
      this._permissionasked = true
    }
  }

  copyClipboard(args) {
	  navigator.clipboard.writeText(String(args.TEXT));
  }
	pasteClipboard(args) {
    if (!this_haspermission) {
      this._askpermission(this._permissionreason);
    }
    if (this._haspermission) {
      try {
        const clipboardcontents = String(navigator.clipboard.read());
        if (length(clipboardcontents) > args.MAXLENGTH) {
          return("[Clipboard length too long]");
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
    this._askpermission(String(args.REASON));
  }
  permissionreason(args) {
	  return(this._permissionreason);
  }
  setpermissionreason(args) {
    this._permissionreason = args.REASON;
  }
  haspermission(args) {
	  return(this._haspermission);
  }
}

Scratch.extensions.register(new ClipboardExtension());
