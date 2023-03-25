import { UploadOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Upload, UploadFile } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { DraggableUploadListItem } from "./DraggableListItem";

interface IProps {
    fileState: [UploadFile<File>[], Dispatch<SetStateAction<UploadFile<File>[]>>]
}

export default function UploadImages({ fileState }: IProps) {
    const [fileList, setFileList] = fileState

    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    return <DndContext sensors={[sensor]} onDragEnd={onDragEnd} data-fileList={fileList}>
        <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
            <Upload
                name="logo"
                listType="picture"
                maxCount={15}
                multiple
                fileList={fileList}
                previewFile={async (file) => {
                    return URL.createObjectURL(file)
                }}
                iconRender={(file) => {
                    return <img src={URL.createObjectURL(file as any)} />
                }}
                onRemove={(file) => {
                    setFileList(fileList.filter((i) => i.uid !== file.uid))
                }}
                itemRender={(originNode, file) => (
                    <DraggableUploadListItem originNode={originNode} file={file} />
                )}
                beforeUpload={(file, files) => {
                    setFileList([...fileList, ...files])
                    return false
                }}>
                <Button icon={<UploadOutlined />}>Şəkil əlavə et</Button>
            </Upload>
        </SortableContext>
    </DndContext>
}