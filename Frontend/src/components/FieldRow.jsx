import React from 'react';
import { Input, Select, Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const FieldRow = ({ field, onUpdate, onDelete, onAddNested, level = 0 }) => {
  const handleNameChange = (e) => {
    onUpdate({ name: e.target.value });
  };

  const handleTypeChange = (value) => {
    onUpdate({ type: value });
  };


  return (
    <div className="field-row" style={{ marginLeft: `${level * 20}px` }}>
      <Input
        placeholder="Field name"
        value={field.name}
        onChange={handleNameChange}
        className="field-name-input"
      />
      
      <Select
        value={field.type}
        onChange={handleTypeChange}
        className="field-type-select"
      >
        <Option value="String">String</Option>
        <Option value="Number">Number</Option>
        <Option value="Boolean">Boolean</Option>
        <Option value="ObjectId">ObjectId</Option>
        <Option value="Nested">Nested</Option>

      </Select>

      <div className="actions-container">
        {field.type === 'Nested' && (
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={onAddNested}
            size="small"
          >
            Add Nested Field
          </Button>
        )}
        
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={onDelete}
          size="small"
        />
      </div>
    </div>
  );
};

export default FieldRow; 