import StarterKit from "@tiptap/starter-kit";
import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    MenuButtonBlockquote,
    RichTextEditor,
    MenuButtonBulletedList,
    MenuButtonUnderline,
    MenuButtonHorizontalRule,
    MenuButtonOrderedList,
    type RichTextEditorRef,
} from "mui-tiptap";

import { Markdown } from "@tiptap/markdown";
import { useRef } from "react";

interface RichTextEditorComponentProps {
    value: string;
    onChange: (value: string) => void;
}

function RichTextEditorComponent({ value, onChange }: RichTextEditorComponentProps) {
    const rteRef = useRef<RichTextEditorRef>(null);

    return (
        <div style={{ width: '100%' }}>
            <RichTextEditor
                ref={rteRef}
                extensions={[StarterKit, Markdown]}
                content={value}
                contentType="markdown"
                onUpdate={(editor) => {
                    onChange(editor.editor.getMarkdown());
                }}
                renderControls={() => (
                    <MenuControlsContainer>
                        <MenuSelectHeading />
                        <MenuDivider />
                        <MenuButtonBold />
                        <MenuButtonItalic />
                        <MenuButtonUnderline />
                        <MenuDivider />
                        <MenuButtonBlockquote />
                        <MenuDivider />
                        <MenuButtonBulletedList />
                        <MenuButtonOrderedList />
                        <MenuDivider />
                        <MenuButtonHorizontalRule />
                    </MenuControlsContainer>
                )}
            />
        </div>
    );
}

export default RichTextEditorComponent;
