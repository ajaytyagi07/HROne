import React, { useState } from 'react';
import { Tabs, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SchemaForm from './SchemaForm';
import JsonPreview from './JsonPreview';

const SchemaBuilder = () => {
  const [schemaData, setSchemaData] = useState([
    {
      id: '1',
      name: 'name',
      type: 'String',
      children: []
    }
  ]);

  const addNewField = () => {
    const newField = {
      id: Date.now().toString(),
      name: '',
      type: 'String',
      children: []
    };
    setSchemaData([...schemaData, newField]);
  };

  const updateField = (fieldId, updates) => {
    const updateFieldRecursive = (fields) => {
      return fields.map(field => {
        if (field.id === fieldId) {
          return { ...field, ...updates };
        }
        if (field.children && field.children.length > 0) {
          return { ...field, children: updateFieldRecursive(field.children) };
        }
        return field;
      });
    };
    setSchemaData(updateFieldRecursive(schemaData));
  };

  const deleteField = (fieldId) => {
    const deleteFieldRecursive = (fields) => {
      return fields.filter(field => {
        if (field.id === fieldId) {
          return false;
        }
        if (field.children && field.children.length > 0) {
          field.children = deleteFieldRecursive(field.children);
        }
        return true;
      });
    };
    setSchemaData(deleteFieldRecursive(schemaData));
  };

  const addNestedField = (parentId) => {
    const newNestedField = {
      id: Date.now().toString(),
      name: '',
      type: 'String',
      children: []
    };

    const addNestedFieldRecursive = (fields) => {
      return fields.map(field => {
        if (field.id === parentId) {
          return { ...field, children: [...field.children, newNestedField] };
        }
        if (field.children && field.children.length > 0) {
          return { ...field, children: addNestedFieldRecursive(field.children) };
        }
        return field;
      });
    };
    setSchemaData(addNestedFieldRecursive(schemaData));
  };

  const items = [
    {
      key: '1',
      label: 'Schema Builder',
      children: (
        <div>
          <Space style={{ marginBottom: 16 }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={addNewField}
            >
              Add Task
            </Button>
          </Space>
          <SchemaForm
            schemaData={schemaData}
            onUpdateField={updateField}
            onDeleteField={deleteField}
            onAddNestedField={addNestedField}
          />
        </div>
      ),
    },
    {
      key: '2',
      label: 'JSON Preview',
      children: <JsonPreview schemaData={schemaData} />,
    },
  ];

  return (
    <div className="schema-builder-container">
      <div className="schema-header">
        JSON Schema Builder
      </div>
      <div className="schema-content">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default SchemaBuilder; 