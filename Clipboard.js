class ClipboardExtension {
  getInfo() {
    return {
      id: 'cs2627883-Clipboard',
      name: 'Clipboard',
      blocks: [
        {
          opcode: 'pasteClipboard',
          blockType: Scratch.BlockType.REPORTER,
          text: 'paste clipboard',
          arguments: {
          },
		  opcode: 'copyClipboard',
          blockType: Scratch.BlockType.REPORTER,
          text: 'copy [Text] to clipboard',
          arguments: {
			Text: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hi!'
            }
          },
        }
      ]
    };
  }
  copyClipboard(args) {
	navigator.clipboard.writeText(String(args.TEXT));
  }
	pasteClipboard(args) {
	return(String(navigator.clipboard.read()));
  }
}
Scratch.extensions.register(new ClipboardExtension());
