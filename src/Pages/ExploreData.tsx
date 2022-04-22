import { useEffect, useState } from "react";
import feathersClient from "../Api";
import Choropleth from "../Components/Choropleth";
import Layout from "../Components/Layout"
import ReactTooltip from "react-tooltip";
import { ChartWrapper } from "../BaseStyledComponents/ChartWrapper";
import { ConvertDatabaseFieldToDisplayString } from "../Utility/StringFormatting";
import { Row } from "../BaseStyledComponents/Row";
import { Col } from "../BaseStyledComponents/Col";
import ColorSelect from "../Components/ColorSelect";
import Select from 'react-select';

interface LooseObject {
    [key: string]: any
}

const ExploreData = () => {
    const [choroplethData, setChoroplethData] = useState([]);
    const[color1, setColor1] = useState<string | undefined>('#ffa343');
    const[color2, setColor2] = useState<string | undefined>('#7442cb');
    const[columnSelect, setColumnSelect] = useState<any[]>([]);
    const[choroplethColumn, setChoroplethColumn] = useState<string>('total_deaths_per_million');
    const[toolTipContent, setToolTipContent] =useState('');
    const[countries, setCountries] = useState<any[]>();
    const[lineChartColumns, setLineChartColumns] = useState<any[]>([{ label: 'People Fully Vaccinated Per Hundred', value: 'people_fully_vaccinated_per_hundred'}]);
    const[lineChartCountries, setLineChartCountries] = useState<any[]>([
        { label: 'United States', value: 'United States'},
        { label: 'Canada', value: 'Canada' }, 
        { label: 'Mexico', value: 'Mexico' }]);
    const[lineChartData, setLineChartData] = useState<any[]>([]);

    useEffect(() => {
        fetchChoroplethData();
    }, [choroplethColumn, color1, color2])

    useEffect(() => {
        fetchLineChartData();
    }, [lineChartColumns, lineChartCountries])

    const fetchChoroplethData = async () => {
        const result = await feathersClient.service('covid').find({
            query: {
                date: {
                    $gte: new Date('2022, 01, 01'),
                    $lt: new Date('2022, 01, 02'),
                },  //by picking a unique date i can get each country at that date.
                $sort: {
                    [choroplethColumn]: -1
                }
            }
        });

        //set columns from table
        if(!columnSelect || columnSelect.length === 0){
            setColumnSelect(Object.keys(result.data[0]).map((x: string) => {
                if(x !== 'id' 
                    && x !== 'location'
                    && x !== 'date'
                    && x !== 'iso_code'
                    && x !== 'continent')
                    {
                    return {
                        value: x,
                        label: ConvertDatabaseFieldToDisplayString(x)
                    }
                }
            }).filter(x => !!x));
        }

        //set available countries
        if(!countries || countries.length === 0){
            setCountries(result.data.map((x: any) => {
                if(x && x.location)
                {
                    return {
                        value: x.location,
                        label: x.location
                    }
                }
            }))
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
                $select: ['date', 'location', ...lineChartColumns.map(x => x.value)],
                location: {
                    $in: lineChartCountries.map(x => x.value)
                },
                $sort: {
                    date: 1
                }
            }
        });

        //this is very messy/gross
        let uniqueDates = [...Array.from(new Set(result.data.map((x: any) => x.date)))];
        let columnNames = getColumnNames();
        let lineData = []; 
        
        for(var i = 0; i < uniqueDates.length; i++)
        {
            let subArr = getColumnValues(result.data.filter((x: any) => x.date === uniqueDates[i]));

            var obj: LooseObject = {
                date: uniqueDates[i]
            };

            for(var j = 0; j < columnNames.length; j++){
                obj[columnNames[j]] = subArr[j];
            }

            lineData.push(obj);
        }

        console.log(lineData);
        //setLineChartData(lineData);
    }
    
    const getColumnNames = (): string[]  => {
        let names = [];
        for(var i = 0; i < lineChartCountries.length; i++){
            for(var j = 0; i < lineChartColumns.length; i++)
            {
                names.push(lineChartCountries[i].value + ' ' + lineChartColumns[j].label);
            }
        }
        return names;
    }

    const getColumnValues = (arr: any[]) => {
        let objVal = [];
        for(var i = 0; i < lineChartCountries.length; i++){
            for(var j = 0; j < lineChartColumns.length; j++){
                var foundObj = arr.find(x => x.location === lineChartCountries[i].value);
                if(foundObj){
                    objVal.push(arr[lineChartColumns[j]]);
                }
                else{
                    objVal.push(null);
                }
            }
        }

        return objVal;
    }

    const manageMultiSelects = (multiVal: any, type: string) => {
        console.log(multiVal);
        if(type === "country"){
            if(multiVal.length * lineChartColumns.length <= 6){
                setLineChartCountries(multiVal);
            }
            else{
                if(lineChartCountries.length > 0){
                    setLineChartCountries(multiVal.slice(1));
                }
                else{
                    setLineChartColumns(lineChartColumns.slice(1));
                    setLineChartCountries(multiVal)
                }
            }
        }
        else if(type === "column"){
            if(multiVal.length * lineChartCountries.length <= 6){
                setLineChartColumns(multiVal);
            }
            else{
                if(lineChartColumns.length > 0){
                    setLineChartColumns(multiVal.slice(1));
                }
                else{
                    setLineChartCountries(lineChartCountries.slice(1));
                    setLineChartColumns(multiVal)
                }
            }
        }
    }

    return (
        <Layout>
            <Row justifyContent="center">
                <h2>An Introduction</h2>
                <p> 
                    Below you will find a couple charts displaying data from the COVID-19 pandemic. All data 
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
                    <Col style={{minWidth: '200px'}}>
                        <p>Choose a piece of data to <br/> compare across the world.</p>
                        <Select 
                            isClearable={false}
                            isSearchable={true}
                            options={columnSelect} 
                            onChange={(e) => setChoroplethColumn(e.value)}
                            value={columnSelect.find(x => x.value === choroplethColumn)}/>
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
                    <Col style={{maxWidth: '300px'}}>
                        <p>Choose data sources to compare <br/> 
                        across the duration of the pandemic.</p>
                        <Select 
                            isSearchable={true}
                            isClearable={true}
                            options={columnSelect} 
                            onChange={(e) => manageMultiSelects(e, 'column')}
                            isMulti={true}
                            value={lineChartColumns}/>
                    </Col>
                    <Col style={{maxWidth: '300px'}}>
                        <p>Choose countries <br/> to compare values on.</p>
                        <Select value={lineChartCountries}
                            options={countries}
                            isClearable={true}
                            isSearchable={true}
                            isMulti={true}
                            onChange={(e) => manageMultiSelects(e, 'country')}
                        />
                    </Col>
                </Row>
                <Row justifyContent="center">
                    <p>You can plot a total of 6 lines below, currently you have a total of {lineChartColumns.length * lineChartCountries.length}.</p>
                </Row>
                
            </ChartWrapper>
        </Layout>
    );
}

export default ExploreData;