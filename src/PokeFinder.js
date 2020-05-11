import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PokeDetail from './PokeDetail'

class PokeFinder extends Component {

  constructor(props) {
   super(props)
   this.changePokeName = this.changePokeName.bind(this)
  }

  state = {
    roles: [],
    types: ["All", "Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying",
     "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"],
    url_back: "http://localhost:3001",
    type: "All",
    role: "Hazard",
    pokeInDaList: [],
    typeInDaList: [],
    idInDaList: [],
    rarityInDaList: [],
    searchDone: false,
    pokeNameSearch: '',
  }

  componentDidMount () {
    this.getCompendium();
  }

  changePokeName = (event) => {

    this.setState({ pokeNameSearch: event.target.value })

    if (event.target.value.length >= 3) {
      this.getPokeInDaListWithName(event.target.value)
    } else {
      this.setState({ searchDone: false })
    }
  }

  getPokeInDaListWithName = async (pokeName) => {
    const url = `${this.state.url_back}/getPokeInDaListWithName?pokename=${pokeName}`;
    let res;
    try {
      res = await axios.get(url)
      this.setState({ pokeInDaList: res.data["data"][0], typeInDaList: res.data["data"][1], rarityInDaList: res.data["data"][2], idInDaList: res.data["data"][3], searchDone: true })
    } catch(e) {
      console.log("GET POKE IN DA LIST WITH NAME ERROR: " + e)
    }
  }

  getCompendium = async () => {
    const url = this.state.url_back + "/getCompendium";
    let res;
    try {
      res = await axios.get(url);
      this.setState({ roles: res.data["data"] })
    } catch(e) {
      console.log("GET COMPENDIUM ERROR: " + e)
    }
  }

  getPokeInDaList = async () => {
    const url = `${this.state.url_back}/getPokeInDaList?type=${this.state.type}&role=${this.state.role}`;
    let res;
    try {
      res = await axios.get(url)
      this.setState({ pokeInDaList: res.data["data"][0], typeInDaList: res.data["data"][1], rarityInDaList: res.data["data"][2], idInDaList: res.data["data"][3], searchDone: true })
    } catch(e) {
      console.log("GET POKE IN DA LIST ERROR: " + e)
    }
  }

  resetPage = () =>{
    this.setState({pokeInDaList: [], typeInDaList: [], rarityInDaList: [], idInDaList: [], searchDone: false, pokeNameSearch: "" })
  }

  render () {

    let roles = this.state.roles
    let types = this.state.types

    let pokeInDaList = this.state.pokeInDaList
    let typeInDaList = this.state.typeInDaList
    let rarityInDaList = this.state.rarityInDaList
    let idInDaList = this.state.idInDaList

    return (
      <Router>
          <div className="box content">
            <div className="block">
              <div className="columns marging-left-right">
                <div className="column">
                  <label className="subtitle">Type : </label>
                  <div className="select">
                    <select onChange={e => this.setState({type: e.target.value})}>
                      {
                        types.map((elt, index) => (
                          <option>{elt}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="column">
                  <label className="subtitle">Roles : </label>
                  <div className="select">
                    <select onChange={e => this.setState({role: e.target.value})}>
                      {
                        roles.map((elt, index) => (
                          <option>{elt}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="column">
                  <button className="button is-info" onClick={e => this.getPokeInDaList()}>Research</button>
                  <Link to="/">
                    <button style={{marginLeft: "2%"}} className="button is-danger" onClick={e => this.resetPage()}>Clear</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="columns is-vcentered">
              <div className="column"/>
              <div className="column">
                <p className="subtitle">Or search by name:</p>
                <input className="input" placeholder="Type here" value={this.state.pokeNameSearch} onChange={this.changePokeName}/>
              </div>
              <div className="column"/>
            </div>

            {
              this.state.searchDone ? (
                <div>
                  <div className="block">
                    <h1 className="subtitle is-4" style={{color: "#626e6b"}}>Click on the Poke's name to see his sets!</h1>
                  </div>
                  <div className="block box">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Rarity Tier</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          pokeInDaList.map((elt, index) => (
                            <tr>
                              <td>
                                <img src={idInDaList[index] !== 479 ? `${this.state.url_back}/static/${idInDaList[index]}.png` : `${this.state.url_back}/static/${idInDaList[index]}${elt.toLowerCase().replace("rotom", "")}.png`}/>
                              </td>
                              <td>
                                <Link to={'/poke/' + elt}>
                                  {elt}
                                </Link>
                              </td>
                              <td>
                                {
                                  typeInDaList[index].join(" / ")
                                }
                              </td>
                              <td>{rarityInDaList[index]}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="subtitle is-4" style={{color: "#626e6b"}}>Research for the type/role you're looking for!</h1>
                </div>
              )
            }
          </div>
        <Route path="/poke/:pokename" render={(props) => (
          <PokeDetail key={props.match.params.pokename} {...props} />
        )} />

        <div className="scrollingContainer" />

      </Router>
    );
  }
}
export default PokeFinder;
