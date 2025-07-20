import React from 'react';

const JsonPreview = ({ schemaData }) => {
  const getDefaultValue = (type) => {
    switch (type) {
      case 'String':
        return 'String';
      case 'Number':
        return 'number';
      case 'Boolean':
        return 'boolean';
      case 'ObjectId':
        return 'objectId';
      case 'Nested':
        return {};
      default:
        return '';
    }
  };

  const generateJsonFromSchema = (fields) => {
    const result = {};
    
    fields.forEach(field => {
      if (field.name) {
        if (field.type === 'Nested' && field.children && field.children.length > 0) {
          result[field.name] = generateJsonFromSchema(field.children);
        } else {
          result[field.name] = getDefaultValue(field.type);
        }
      }
    });
    
    return result;
  };

  const jsonOutput = generateJsonFromSchema(schemaData);
  const formattedJson = JSON.stringify(jsonOutput, null, 2);

  return (
    <div>
      <h3>Generated JSON Schema</h3>
      <div className="json-preview">
        {formattedJson}
      </div>
    </div>
  );
};

export default JsonPreview; 