# selection-foreground - Selection Foreground Alternative

This extension allows to change color of selected text and kinda implements functionality of native `editor.selectionForeground` property (which doesn't work currently).

So now you can use contrast selection background color and see things clearly.

It works a bit slow, due to how VSCode decorators work. But it works.

## Features

- Automatically highlights selected text with a specified color

![Section Decoration Example](images/example.png)

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P` to open the Quick Open dialog
3. Type `ext install selection-foreground`
4. Click install

## Usage

1. Set selection text color via settings or with `selection-foreground.textColor` property
2. Press `Ctrl+Shift+P` / `Cmd+Shift+P` to open the Command Palette
3. Type `Selection Foreground: Toggle`
4. Set some `editor.selectionBackground` if not set already
