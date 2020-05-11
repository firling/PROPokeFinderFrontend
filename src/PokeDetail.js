import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Morning from "./file/Morning.png";
import Day from "./file/Day.png";
import Night from "./file/Night.png";

class PokeSet extends Component {

  state = {
    pokeName: null,
    url_back: "http://localhost:3001",
    moves: [],
    items: [],
    abilities: [],
    natures: [],
    evs: [],
    classPokemonSets: "button is-link",
    classPokemonSpawns: "button is-dark",
    currentButton: "sets",
    map: [],
    morning: [],
    day: [],
    night: [],
    minLvl: [],
    maxLvl: [],
    item: [],
    ms: [],
    tier: [],
    landSpawn: [],
    pokemon: [],
    id: [],
    tiersAvailable: [],
    currentSelectedTier: "All",
  }

  componentDidMount() {
    const { match: { params } } = this.props
    this.setState({ pokeName: params.pokename })
    this.fetchPokeSet()
    this.fetPokeSpawn()
  }

  compare = (x, y) => {
    return x - y
  }

  fetPokeSpawn = async () => {
    const url = `${this.state.url_back}/getPokeSpawn?pokename=${this.props.match.params.pokename}`
    let res
    try {
      res = await axios.get(url)

      var maps = []
      var mornings = []
      var days = []
      var nights = []
      var minLvls = []
      var maxLvls = []
      var items = []
      var mss = []
      var tiers = []
      var landSpawn = []
      var pokemon = []
      var id = []

      res.data["data"].forEach(function(elem) {
        maps.push(elem["Map"])
        mornings.push(elem["Morning"])
        days.push(elem["Day"])
        nights.push(elem["Night"])
        minLvls.push(elem["MinLvl"])
        maxLvls.push(elem["MaxLvl"])
        items.push(elem["Item"])
        mss.push(elem["Member"])
        tiers.push(elem["Tier"])
        landSpawn.push(elem["LandSurf"])
        pokemon.push(elem["Pokemon"])
        id.push(elem["ID"])
      })

      this.setState({
        map: maps,
        morning: mornings,
        day: days,
        night: nights,
        minLvl: minLvls,
        maxLvl: maxLvls,
        item: items,
        ms: mss,
        tier: tiers,
        landSpawn: landSpawn,
        pokemon: pokemon,
        id: id
      })
    } catch(e) {
      console.log("GET POKE SPAWN ERROR: " + e)
    }
    this.fillTiersAvailable()
  }

  fillTiersAvailable = () => {
    const tiers = this.state.tier
    let tiersAvailable = []
    tiers.forEach(function(elem) {
      if (!tiersAvailable.includes(elem)){
        tiersAvailable.push(elem)
      }
    })

    tiersAvailable.sort(this.compare)

    this.setState({
      tiersAvailable: tiersAvailable
    })
  }

  fetchPokeSet = async () => {
    const url = `${this.state.url_back}/getPokeSet?pokename=${this.props.match.params.pokename}`;
    let res;
    try {
      res = await axios.get(url)

      this.setState({
        moves: Object.values(res.data["data"]["moves"]),
        items: res.data["data"]["item"],
        abilities: res.data["data"]["Ability"],
        natures: res.data["data"]["Nature"],
        evs: res.data["data"]["Evs"],
      })
      window.scrollTo(0,document.body.scrollHeight)
    } catch(e) {
      console.log("GET POKE SET ERROR: " + e)
    }
  }

  buttonClick = (button) => {
    if (button === "sets") {
      if (this.state.classPokemonSets === "button is-dark") {
        this.setState({
          classPokemonSets: "button is-link",
          classPokemonSpawns: "button is-dark",
          currentButton: "sets",
        })
      }
    } else {
      if (this.state.classPokemonSpawns === "button is-dark") {
        this.setState({
          classPokemonSets: "button is-dark",
          classPokemonSpawns: "button is-link",
          currentButton: "spawns",
        })
      }
    }
  }

  render () {

    var {pokeName} = this.state

    var {moves} = this.state
    var {items} = this.state
    var {abilities} = this.state
    var {natures} = this.state
    var {evs} = this.state

    var {map} = this.state
    var {landSpawn} = this.state
    var {morning} = this.state
    var {day} = this.state
    var {night} = this.state
    var {minLvl} = this.state
    var {maxLvl} = this.state
    var {item} = this.state
    var {ms} = this.state
    var {tier} = this.state
    var {tiersAvailable} = this.state
    var {pokemon} = this.state
    var {id} = this.state


    return(
      <div className="container box">
      <h1 className="title">{pokeName}</h1>
      <div className="block">
        <button className={this.state.classPokemonSets} onClick={e => this.buttonClick("sets")}>
          Pokemon's sets
        </button>
        <button className={this.state.classPokemonSpawns} onClick={e => this.buttonClick("spawns")}>
          Pokemon's spawns
        </button>
      </div>
        {
          this.state.currentButton === "sets" ? (
            <div className="block">
              {
                moves.map((elt, index) => (
                  <div className="block box container columns" style={{marginTop: "2%"}}>
                    <div className="column">
                      <table className="center">
                        {
                          elt.map((element, index) => (
                            <tr>
                              <td><b>Move {index+1}</b>: {element}</td>
                            </tr>
                          ))
                        }
                      </table>
                    </div>
                    <div className="column">
                      <table>
                        <tr>
                          <td><b>Item</b>: {items[index]}</td>
                        </tr>
                        <tr>
                          <td><b>Ability</b>: {abilities[index]}</td>
                        </tr>
                        <tr>
                          <td><b>Nature</b>: {natures[index]}</td>
                        </tr>
                        <tr>
                          <td><b>Evs</b>: {evs[index]}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                ))
            }
            </div>
          ) : (
            <div className="block">
              <label className="subtitle">Tiers Available: </label>
              <div className="select">
                <select onChange={e => this.setState({currentSelectedTier: e.target.value})}>
                <option>All</option>
                {
                  tiersAvailable.map((element, index) => (
                    <option>{element}</option>
                  ))
                }
                </select>
              </div>
              <div className="block">

                {
                  this.state.currentSelectedTier === "All" ? (
                    <div className="block">
                      {
                        map.map((element, index) => (
                          <div className="block box container columns" style={{marginTop: "2%"}}>
                            <div className="columns is-vcentered columnFullWidth">
                              <div className="column is-one-quarter">
                                <p className="subtitle">{pokemon[index]}</p>
                                <img src={`${this.state.url_back}/static/${id[index]}.png`}/>
                              </div>
                              <div className="column">
                                <table className="center">
                                  <tr>
                                    <td><b>Map: </b>{map[index]}</td>
                                  </tr>
                                  <tr>
                                    <td><b>Area: </b>{landSpawn[index] === "1" ? "Land": "Surf"}</td>
                                  </tr>
                                  <tr>
                                    <td><b>Lvl Min: </b>{minLvl[index]}</td>
                                  </tr>
                                  <tr>
                                    <td><b>Lvl Max: </b>{maxLvl[index]}</td>
                                  </tr>
                                  {
                                    item[index] ? (
                                      <tr>
                                        <td><b>Item: </b>{item[index]}</td>
                                      </tr>
                                    ) : (
                                      <div/>
                                    )
                                  }
                                  <tr>
                                    <td><b>Membership: </b>{ms[index] === "1" ? "Yes": "No"}</td>
                                  </tr>
                                  <tr>
                                    <td><b>Tier: </b>{tier[index]}</td>
                                  </tr>
                                </table>
                              </div>
                              <div className="column">
                                <p className="subtitle">Daytime Spawn:</p>
                                <div className="columns">
                                  {
                                    morning[index] === "1" ? (
                                      <div className="column">
                                        <img className="imgSize" src={Morning} alt="morning"/>
                                      </div>
                                    ) : (
                                      <div className="column" />
                                    )
                                  }
                                  {
                                    day[index] === "1" ? (
                                      <div className="column">
                                        <img className="imgSize" src={Day} alt="morning"/>
                                      </div>
                                    ) : (
                                      <div className="column" />
                                    )
                                  }
                                  {
                                    night[index] === "1" ? (
                                      <div className="column">
                                        <img className="imgSize" src={Night} alt="morning"/>
                                      </div>
                                    ) : (
                                      <div className="column"/>
                                    )
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="block">
                      {
                        map.map((element, index) => (
                          <div>
                            {
                              tier[index] == this.state.currentSelectedTier ? (
                                <div className="block box container columns" style={{marginTop: "2%"}}>
                                  <div className="columns is-vcentered columnFullWidth">
                                    <div className="column is-one-quarter">
                                      <p className="subtitle">{pokemon[index]}</p>
                                      <img src={`${this.state.url_back}/static/${id[index]}.png`}/>
                                    </div>
                                    <div className="column">
                                      <table className="center">
                                        <tr>
                                          <td><b>Map: </b>{map[index]}</td>
                                        </tr>
                                        <tr>
                                          <td><b>Area: </b>{landSpawn[index] === "1" ? "Land": "Surf"}</td>
                                        </tr>
                                        <tr>
                                          <td><b>Lvl Min: </b>{minLvl[index]}</td>
                                        </tr>
                                        <tr>
                                          <td><b>Lvl Max: </b>{maxLvl[index]}</td>
                                        </tr>
                                        {
                                          item[index] ? (
                                            <tr>
                                              <td><b>Item: </b>{item[index]}</td>
                                            </tr>
                                          ) : (
                                            <div/>
                                          )
                                        }
                                        <tr>
                                          <td><b>Membership: </b>{ms[index] === "1" ? "Yes": "No"}</td>
                                        </tr>
                                        <tr>
                                          <td><b>Tier: </b>{tier[index]}</td>
                                        </tr>
                                      </table>
                                    </div>
                                    <div className="column">
                                      <p className="subtitle">Daytime Spawn:</p>
                                      <div className="columns">
                                        {
                                          morning[index] === "1" ? (
                                            <div className="column">
                                              <img className="imgSize" src={Morning} alt="morning"/>
                                            </div>
                                          ) : (
                                            <div className="column" />
                                          )
                                        }
                                        {
                                          day[index] === "1" ? (
                                            <div className="column">
                                              <img className="imgSize" src={Day} alt="morning"/>
                                            </div>
                                          ) : (
                                            <div className="column" />
                                          )
                                        }
                                        {
                                          night[index] === "1" ? (
                                            <div className="column">
                                              <img className="imgSize" src={Night} alt="morning"/>
                                            </div>
                                          ) : (
                                            <div className="column"/>
                                          )
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div/>
                              )
                            }
                          </div>
                        ))
                      }
                    </div>
                  )
                }


              </div>
            </div>
          )
        }
      </div>
    );
  }
}
export default PokeSet;
