import React from 'react';
import FieldRow from './FieldRow';

const SchemaForm = ({ 
  schemaData, 
  onUpdateField, 
  onDeleteField, 
  onAddNestedField,
  level = 0 
}) => {
  const renderFields = (fields, currentLevel) => {
    return fields.map((field) => (
      <div key={field.id}>
        <FieldRow
          field={field}
          onUpdate={(updates) => onUpdateField(field.id, updates)}
          onDelete={() => onDeleteField(field.id)}
          onAddNested={() => onAddNestedField(field.id)}
          level={currentLevel}
        />
        {field.type === 'Nested' && field.children && field.children.length > 0 && (
          <div className="nested-fields">
            <SchemaForm
              schemaData={field.children}
              onUpdateField={onUpdateField}
              onDeleteField={onDeleteField}
              onAddNestedField={onAddNestedField}
              level={currentLevel + 1}
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      {renderFields(schemaData, level)}
    </div>
  );
};

export default SchemaForm; 