import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import XForm from '../components/x-form';
import XFormItem from '../components/x-form-item';
import XSelect from '../components/x-select';
import XInput from '../components/x-input';

interface FilterForm {
  Select: any;
}

type SizeType = Parameters<typeof Form>[0]['size'];

const App: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
    'default',
  );

  const [form] = Form.useForm<FilterForm>();

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleFinish = (value: FilterForm) => {
    console.log('XForm finish', value);
  };

  return (
    <XForm<FilterForm>
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
      onFinish={handleFinish}
      onStateChange={(...args: any) => {
        console.log('onStateChange', ...args);
      }}
    >
      <XFormItem label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </XFormItem>
      <XFormItem name="input" label="Input">
        <XInput />
      </XFormItem>
      <XFormItem name="Select" label="Select">
        <XSelect>
          <Select.Option value="demo">Demo</Select.Option>
          <Select.Option value="demo2">Demo2</Select.Option>
        </XSelect>
      </XFormItem>
      <XFormItem name="TreeSelect" label="TreeSelect">
        <TreeSelect
          treeData={[
            {
              title: 'Light',
              value: 'light',
              children: [{ title: 'Bamboo', value: 'bamboo' }],
            },
          ]}
        />
      </XFormItem>
      <XFormItem name="Cascader" label="Cascader">
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [{ value: 'hangzhou', label: 'Hangzhou' }],
            },
          ]}
        />
      </XFormItem>
      <XFormItem label="DatePicker">
        <DatePicker />
      </XFormItem>
      <XFormItem label="InputNumber">
        <InputNumber />
      </XFormItem>
      <XFormItem label="Switch" valuePropName="checked">
        <Switch />
      </XFormItem>
      <XFormItem label="Button">
        <Button
          onClick={() => {
            form.submit();
          }}
        >
          XFormItem Button
        </Button>
      </XFormItem>
    </XForm>
  );
};

export default App;
