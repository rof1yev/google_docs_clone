import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHightExtension = Extension.create({
  name: "lineHeight",
  addOptions: () => {
    return { types: ["paragraph", "heading"], defaultLineHight: "normal" };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHight: {
            default: this.options.defaultLineHight,
            renderHTML: (attributes) => {
              if (!attributes.lineHight) return {};

              return {
                style: `line-height: ${attributes.lineHight}`,
              };
            },
            parseHTML: (element) => {
              return element.style.lineHeight || this.options.defaultLineHight;
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHight: string) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHight,
              });
            }
          });

          if (dispatch) dispatch(tr);
          return true;
        },
      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHight: this.options.defaultLineHight,
              });
            }
          });

          if (dispatch) dispatch(tr);
          return true;
        },
    };
  },
});
