import React, { useEffect, useState } from 'react'
import BarCharts from './BarChart'
import './style.css'
import MapComponent from './Map'
import { getphapi } from '../../api/api';
import { CiMap } from "react-icons/ci";
import { BsGraphUp } from "react-icons/bs";
import {
  
  PieChartOutlined,
  HistoryOutlined, 
  TableOutlined 
} from '@ant-design/icons';
import {  Layout, Menu, theme } from 'antd';
import { getLastValues } from "../../api/api";
const {  Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Charts', '1', <PieChartOutlined />),
  getItem('History', '2', <HistoryOutlined />, [
    getItem('Map', '3',<CiMap />  ),
    getItem('Graphs', '4', <BsGraphUp />),
    getItem('Table', '5', <TableOutlined />),
    // Add more sub-items here...
  ]),
];
function History() {
  
  const [phData, setPhData] = useState(
   [
    {
      name: '20/10/2022',
      Ph: 4000,
      amt: 2400,
    },
    {
      name: '21/10/2022',
      Ph: 3000,
      amt: 2210,
    },
    {
      name: '22/10/2022',
      Ph: 2000,
      amt: 2290,
    },
    {
      name: '23/10/2022',
      Ph: 2780,
      amt: 2000,
    },
    {
      name: '24/10/2022',
      Ph: 1890,
      amt: 2181,
    },
    {
      name: '25/10/2022',
      Ph: 2390,
      amt: 2500,
    },
    {
      name: '26/10/2022',
      Ph: 3490,
      amt: 2100,
    },
   
    ]
    );
    const [tmpData, setTmpData] = useState(
      [
         {
           name: 'temp',
           ph: 40,
          
         }, {
           name: 'temp',
           ph: 40,
          
         },
       ]
       );
    const [data, setData] = useState(null);
  const fetchPhData = async () => {
    console.log("Fetching data...");
    try {
      const responseData = await getphapi(5);
      setPhData(responseData.values);
      console.log("Data fetched successfully:", responseData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
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
 fetchPhData();
 fetchData();

 }, []); // Empty dependency array means this effect will run once after initial render

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleClick = (key) => {
    if (key === '2') {
      window.location.pathname = '/history';
    }
    if (key === '1') {
      window.location.pathname = '/stream';
    }
    if (key === '3') {
      document.getElementById('map').scrollIntoView();

    }
    if (key === '4') {
      document.getElementById('row').scrollIntoView();

    }
    if (key === '5') {
      document.getElementById('table').scrollIntoView();

    }
  };
    return (
      <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="light" defaultSelectedKeys={['3']} mode="inline" defaultOpenKeys={['2','3']} items={items} onClick={({ key }) => handleClick(key)} />
      </Sider>
      <Layout>
        
        <Content
          style={{
    margin: '0 16px',
    overflow: 'auto', // Add this line
  }}
        >
        <div className=' d-flex justify-content-center flex-column  bck'>
        <div id='map'>
        <MapComponent/>
        </div>

             <div className='row ' id="row">
                <div className='col-md-6 col-12'>
                    <BarCharts dataKey='Ph' data={phData}/>

                </div>
                <div className='col-md-6 col-12'>
                <BarCharts dataKey='Ph' data={phData}/>

                </div>
                <div className='col-md-6 col-12'>
                <BarCharts dataKey='Ph' data={phData}/>

                </div>
                <div className='col-md-6 col-12'>
                <BarCharts dataKey='Ph' data={phData}/>

                </div>
            </div>

            <table className="table" id="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">PH Level</th>
                <th scope="col">Turbidity Level</th>
                <th scope="col">Temperature Level</th>
                <th scope="col">Dissolved Oxygen Level</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((entry, index) => (
                <tr key={entry._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{entry.PH_level}</td>
                  <td>{entry.Turbidity_level}</td>
                  <td>{entry.Tepmerature_level}</td>
                  <td>{entry.Dissolved_oxygen_level}</td>
                  <td>{entry.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        </Content>
      </Layout>
    </Layout>
    )
}

export default History