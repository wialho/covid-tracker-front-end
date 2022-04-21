import { useEffect, useState } from "react";
import feathersClient from "../Api";
import Choropleth from "../Components/Choropleth";
import Layout from "../Components/Layout"
import ReactTooltip from "react-tooltip";
import { ChartWrapper } from "../BaseStyledComponents/ChartWrapper";
import { ConvertDatabaseFieldToDisplayString } from "../Utility/StringFormatting";
import { Row } from "../BaseStyledComponents/Row";
import { Col } from "../BaseStyledComponents/Col";
import { Select } from "../BaseStyledComponents/Select";
import ColorSelect from "../Components/ColorSelect";
import { Option } from "../BaseStyledComponents/Option";

const ExploreData = () => {
    const [choroplethData, setChoroplethData] = useState([]);
    const[color1, setColor1] = useState('#ffa343');
    const[color2, setColor2] = useState('#7442cb');
    const[columns, setColumns] = useState<string[]>([]);
    const[choroplethColumn, setChoroplethColumn] = useState('total_deaths_per_million');
    const[toolTipContent, setToolTipContent] =useState('');
    const[countries, setCountries] = useState<string[]>();
    const[lineChartColumn, setLineChartColumn] = useState('total_vaccinations_per_hundred');
    const[lineChartCountries, setLineChartCountries] = useState<string[]>(['United States', 'Canada', 'Mexico']);
    const[lineChartData, setLineChartData] = useState([]);

    useEffect(() => {
        fetchChoroplethData();
    }, [choroplethColumn, color1, color2])

    useEffect(() => {
        fetchLineChartData();
    }, [lineChartColumn, lineChartCountries])



    const fetchChoroplethData = async () => {
        const result = await feathersClient.service('covid').find({
            query: {
                date: {
                    $gte: new Date('2022, 01, 01'),
                    $lt: new Date('2022, 01, 02'),
                },  //by picking a unique date i can get each country at that date.
                $sort: {
                    total_deaths_per_million: -1
                }
            }
        });

        if(!columns || columns.length === 0){
            setColumns(Object.keys(result.data[0]));
        }

        if(!countries || countries.length === 0){
            setCountries(result.data.map((x: any) => x.location))
        }
 
        let diviser = result.data[0][choroplethColumn];
        let modifiedData = result.data.map((x: any) => {
            var y = {
                isocode: x.iso_code,
                comparisonColumn: x[choroplethColumn] / diviser,
                displayValue: x[choroplethColumn],
                country: x.location,
            }
            return y;
        });

        setChoroplethData(modifiedData);
    }

    const fetchLineChartData = async () => {
        const result = await feathersClient.service('covid').find({
            query: {
                $select: ['date', 'location', lineChartColumn],
                location: {
                    $in: lineChartCountries
                },
                $sort: {
                    date: 1
                }
            }
        });

        console.log(result);
    } 

    return (
        <Layout>
            <Row justifyContent="center">
                <h2>An Introduction</h2>
                <p>Below you will find a couple charts displaying data from the COVID-19 pandemic. All data 
                    comes from <a href="https://ourworldindata.org/coronavirus">Our World In Data</a>, who has 
                    committed to updating data daily until the pandemic finished. The dataset set being used is from 04/12/2022
                    and is not updated. See <a href="https://github.com/owid/covid-19-data/tree/master/public/data">here</a> to 
                    download a similar but updated dataset and review what each column means.
                    <br></br> 
                    <br></br>
                    The first chart shows a gradient across the world fixed to a specific date (01/01/2022). The second chart compares 
                    multiple countrys through the duration of the pandemic.
                </p>
            </Row>
            <ChartWrapper>
               <h2>World Gradient</h2>
                <Row justifyContent="center">
                    <Col>
                        <p>Choose a piece of data to <br/> compare across the world.</p>
                        <Select value={choroplethColumn} 
                            onChange={(e) => setChoroplethColumn(e.target.value)}>
                                {columns.map(x => {
                                    return (
                                        <Option key={x} value={x}>{ConvertDatabaseFieldToDisplayString(x)}</Option>
                                    );
                                })}
                        </Select>
                    </Col>
                    <Col>
                        <p>Choose color to represent the <br/> lowest value.</p>
                        <ColorSelect onSelect={setColor1}
                            initialValue={color1}/>
                    </Col>
                    <Col>
                    <p>Choose color to represent the <br/>highest value.</p>
                        <ColorSelect onSelect={setColor2}
                            initialValue={color2}/>
                    </Col>
                </Row>
                <h3>{ConvertDatabaseFieldToDisplayString(choroplethColumn)}</h3>
                <Choropleth data={choroplethData} 
                    columnName='comparisonColumn'
                    color1={color1}
                    color2={color2}
                    setToolTipContent={setToolTipContent}
                    />
                <ReactTooltip>{toolTipContent}</ReactTooltip>
                <small>* All data in the above chart is from the date 01/01/2022. </small>
            </ChartWrapper>
            <ChartWrapper>
               <h2>Time Series</h2>
                <Row justifyContent="center">
                    <Col>
                        <p>Choose a data source to compare <br/> 
                        across the duration of the pandemic.</p>
                        <Select value={lineChartColumn} 
                            onChange={(e) => setChoroplethColumn(e.target.value)}>
                                {columns.map(x => {
                                    return (
                                        <Option key={x} value={x}>{ConvertDatabaseFieldToDisplayString(x)}</Option>
                                    );
                                })}
                        </Select>
                    </Col>
                    <Col>
                        <p>Choose color to represent the <br/> lowest value.</p>
                        <ColorSelect onSelect={setColor1}
                            initialValue={color1}/>
                    </Col>
                    <Col>
                    <p>Choose color to represent the <br/>highest value.</p>
                        <ColorSelect onSelect={setColor2}
                            initialValue={color2}/>
                    </Col>
                </Row>
                
            </ChartWrapper>
        </Layout>
    );
}

export default ExploreData;