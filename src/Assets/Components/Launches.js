import React, { Component } from "react"
import axios from "axios"
import "../Styles/launches.css"
import { Card, Button } from "react-bootstrap"
import { bindActionCreators } from "redux"
import { getLaunches } from "../Actions/Actions"
import { connect } from "react-redux"

const years = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"]

class Launches extends Component {
    state = {
        lurl: "https://api.spacexdata.com/v3/launches?limit=100",        
        land_success: true,        
    }

    getUserData = () => {
        axios.get(`${this.state.lurl}`)
            .then((response) => {
                // handle success                                
                this.props.getLaunches(response.data)
                console.log("launches", this.props.launches)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    selectYear = (y) => {        
        let { lurl } = this.state
        let arr = lurl.split("")
        let index = lurl.indexOf("launch_year")
        if (index == -1)
            lurl += "&launch_year=" + y
        else {
            index += 12            
            arr.splice(index, 4, y)
            lurl = arr.join("")            
        }
        this.setState({ lurl })        
    }
    checkLaunch = value => {        
        let { lurl } = this.state
        let arr = lurl.split("")
        let index = lurl.indexOf("launch_success")
        if (index == -1)
            lurl += "&launch_success=" + value
        else {
            index += 15
            let prev = lurl.substr(index, 4)            
            if (prev == "true")
                arr.splice(index, 4, value)
            else
                arr.splice(index, 5, value)
            lurl = arr.join("")            
        }
        this.setState({ lurl })        
    }
    checkLanding = value => {        
        let { lurl,land_success } = this.state
        land_success = value
        let arr = lurl.split("")
        let index = lurl.indexOf("land_success")
        if (index == -1)
            lurl += "&land_success=" + value
        else {
            index += 13
            let prev = lurl.substr(index, 4)            
            if (prev == "true")
                arr.splice(index, 4, value)
            else
                arr.splice(index, 5, value)
            lurl = arr.join("")            
        }
        this.setState({ lurl,land_success })        
    }
    componentDidMount() {
        this.getUserData()
    }
    componentDidUpdate(prevprops, prevstate) {
        if (prevstate.lurl != this.state.lurl)
            this.getUserData()
    }

    render() {
        const { launches } = this.props
        const { land_success } = this.state
        return (
            <div className="launches">
                <h3>SpaceX Launch Programs</h3>
                <div className="lbox">
                    <div className="filter">
                        <h4>Filters</h4>
                        <h5>Launch Year</h5>
                        <div className="launch_y">
                            {years.map((y, i) => {
                                return (
                                    <Button key={i} className="ybutton" onClick={() => this.selectYear(y)}>{y}</Button>
                                )
                            })}
                        </div>
                        <h5>Successful Launch</h5>
                        <div className="launch_s">
                            <Button onClick={() => this.checkLaunch(true)}>True</Button>
                            <Button onClick={() => this.checkLaunch(false)}>False</Button>
                        </div>
                        <h5>Successful Landing</h5>
                        <div className="launch_l">
                            <Button onClick={() => this.checkLanding(true)}>True</Button>
                            <Button onClick={() => this.checkLanding(false)}>False</Button>
                        </div>
                    </div>
                    <div className="launchbox">
                        {launches.map((l, i) => {
                            return (
                                <Card style={{ width: '18rem' }} key={i} className="lcard" >
                                    <Card.Img variant="top" src={l.links.mission_patch_small} height="150px" />
                                    <Card.Body>
                                        <h2>{l.mission_name}</h2>
                                        <Card.Title>Mission Details:</Card.Title>
                                        <ul>
                                            <li>Mission Ids: {l.rocket.rocket_name}</li>                                            
                                            <li>Launch Year: {l.launch_year} </li>                                            
                                            <li>Successful Launch: {`${l.launch_success}`} </li>
                                            <li>Successful Landing: {`${land_success}`} </li>
                                        </ul>                                        
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                </div>
                <div className="developer">
                    Developed by: Kartik Aggarwal
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        launches: store.launches
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        { getLaunches }, dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Launches)