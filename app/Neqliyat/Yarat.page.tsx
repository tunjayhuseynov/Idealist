import React, { useState } from "react";
import type { ICity } from "types/city";
import type { IAuto, IAutoDB } from "types/category/Auto";
import CreateForm from "components/CreateForm/CreateForm";
import { Form } from "antd";
import { useAuto } from "hooks/useAuto";

interface IProps {
  categories: IAutoDB[];
  cityList: ICity[];
}

function NeqliyatYarat({ cityList, categories: NeqliyatDB }: IProps) {
  const [selectedAuto, setSelectedAuto] = useState<IAutoDB>();

  const { onFinish } = useAuto({ selectedAuto });
  return (
    <>
      <CreateForm cityList={cityList} onFinish={onFinish}>
        <Form.Item></Form.Item>
      </CreateForm>
    </>
  );
}

export default NeqliyatYarat;
