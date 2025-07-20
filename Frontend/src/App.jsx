import React from 'react';
import { ConfigProvider } from 'antd';
import SchemaBuilder from './components/SchemaBuilder';

function App() {
  return (
    <ConfigProvider>
      <div className="app-container">
        <SchemaBuilder />
      </div>
    </ConfigProvider>
  );
}

export default App; 