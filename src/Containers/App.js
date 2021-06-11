import React from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';
import './App.css'

class App extends React.Component{
	constructor(){
		super()
		this.state={
			robots: [],
			searchfield:''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users=>this.setState({robots:users}));
	}

	onsearchchange = (event) => {
		this.setState({searchfield: event.target.value});
		
	}

	render(){
		const filterrobots=this.state.robots.filter(robots =>{
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if(this.state.robots.length===0)
			return <h1>Loading</h1>
		else{
			return(
			<div className='tc'>
				<h1 className='f1'>R O B O F R I E N D S</h1>
				<SearchBox searchchange={this.onsearchchange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filterrobots} />
					</ErrorBoundary>
				</Scroll>
			</div>
			);
		}
		
	}
}

export default App;