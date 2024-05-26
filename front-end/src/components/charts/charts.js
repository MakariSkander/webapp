import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import "./style.css";
import { getLastValues } from "../../api/api";
import { Alert, Layout, Menu, Space } from 'antd';
import { PieChartOutlined, HistoryOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Charts', '1', <PieChartOutlined />),
  getItem('History', '2', <HistoryOutlined />),
];

function Charts() {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const responseData = await getLastValues();
      setData(responseData);
      console.log("Data fetched successfully:", responseData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setVisible(prevVisible => !prevVisible);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (key) => {
    if (key === '2') {
      window.location.pathname = '/history';
    }
    if (key === '1') {
      window.location.pathname = '/stream';
    }
  };

  /*   <div style={{ position: 'fixed', left: '50%', bottom: '10px', transform: 'translateX(-50%)', zIndex: 1000 }}>
            {visible && <Alert
              message="Good water quality"
              description="Water quality is good for fish farming"
              type="success"
              showIcon
              closable
            />}
            {!visible && <Alert
              message="Bad water quality"
              description="Water quality is not good for fish farming"
              type="error"
              showIcon
              closable />}
          </div> */

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => handleClick(key)} />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px', overflow: 'auto' }}>
  
          <div className=" ">
            <div className="blur-background"></div>
            <div className="row overlay-container pb-3">
              <div className="col-md-12 col-12   ">
                <h1 className="text-center text-white font-italic">Water Quality Monitoring</h1>
              </div>
              {data && (
                <>
                  <div className="col-md-6 col-12 d-flex justify-content-center flex-column align-items-center">
                    <GaugeChart
                      id="gauge-chart-ph"
                      nrOfLevels={14}
                      colors={["#03e282", "#ff0000"]}
                      arcWidth={0.2}
                      style={{ width: "50%" }}
                      percent={data[data.length -1]?.PH_level / 100}
                      formatTextValue={(value) => `${value}`}
                    />
                    <h3 style={{ color: "white" }}>pH</h3>
                  </div>
                  <div className="col-md-6 col-12 d-flex justify-content-center flex-column align-items-center">
                    <GaugeChart
                      id="gauge-chart-temperature"
                      nrOfLevels={30}
                      colors={["#03e282", "#ff0000"]}
                      arcWidth={0.2}
                      style={{ width: "50%" }}
                      percent={data[data.length -1]?.Tepmerature_level / 100}
                      formatTextValue={(value) => `${value}`}
                    />
                    <h3 style={{ textAlign: "center", color: "white" }}>Temperature</h3>
                  </div>
                  <div className="col-md-6 col-12 d-flex justify-content-center flex-column align-items-center">
                    <GaugeChart
                      id="gauge-chart-dissolved-oxygen"
                      nrOfLevels={30}
                      colors={["#03e282", "#ff0000"]}
                      arcWidth={0.2}
                      style={{ width: "50%" }}
                      percent={data[data.length -1]?.Dissolved_oxygen_level / 100}
                      formatTextValue={(value) => `${value}`}
                    />
                    <h3 style={{ color: "white" }}>Dissolved Oxygen</h3>
                  </div>
                  <div className="col-md-6 col-12 d-flex justify-content-center flex-column align-items-center">
                    <GaugeChart
                      id="gauge-chart-turbidity"
                      nrOfLevels={30}
                      colors={["#03e282", "#ff0000"]}
                      arcWidth={0.2}
                      style={{ width: "50%" }}
                      percent={data[data.length -1]?.Turbidity_level / 100}
                    />
                    <h3 style={{ color: "white" }}>Turbidity</h3>
                  </div>
                </>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Charts;
