import React from 'react';
import "Style/DotBoard.css";
import FirebaseAction from 'Database/FirebaseAction';
import {AuthContext} from 'Component/Auth/AuthProvider';

export default class DotBoard extends React.Component{
	static contextType = AuthContext;

	constructor(props){
		super(props);

		this.state = {
			status : 0,
		};
	}

	componentDidMount(){
		if(this.state.status === 0) this.getData();
	}

	componentDidUpdate(){
		if(this.state.status === 0) this.getData();
	}

	getData(){
		FirebaseAction.getBoard(this.props.match.params.id,this.props.match.params.bid).then(data=>{
			if(data.size !== JSON.parse(data.data).length){
				let filledDat = [...JSON.parse(data.data)];
				
				for(let a=0; a<data.size; a++){
					if(filledDat[a] === undefined) filledDat[a] = -1;
				}

				data.data = JSON.stringify(filledDat);
			}

			this.setState({
				...data,
				data : JSON.parse(data.data),
				status : 1
			});
		}).catch(console.error);
	}

	handleClick(id){
		let a = JSON.parse(JSON.stringify(this.state.data));

		if(a[id] === 1){
			a[id] = -1;
		}else{
			a[id] += 1;
		}

		this.setState({data : a});
		FirebaseAction.updateBoard(this.props.match.params.id,this.props.match.params.bid,a);
	}

	getPercentComplete(){
		return ((this.state.data.filter((element)=>{return element === 1;}).length/this.state.size)*100).toFixed(0);
	}

	reset(){
		if(!window.confirm("This cannot be undone, are you sure?")) return;
		let a = new Array(this.state.size);
		a.fill(-1);
		this.setState({data : a});
		FirebaseAction.updateBoard(this.props.match.params.id,this.props.match.params.bid,a);
	}

	addElements(e){
		let olddat = this.state.data;

		for(let a=0; a<(parseInt(this.state.size) + parseInt(this.state.addNumber)); a++){
			if(olddat[a] === undefined) olddat[a] = -1;
		}

		this.setState(
			{
				data : olddat, 
				size : (parseInt(this.state.size) + parseInt(this.state.addNumber))
			},()=>{
				FirebaseAction.updateBoard(this.props.match.params.id,this.props.match.params.bid,olddat);
				FirebaseAction.updateSize(this.props.match.params.id,this.props.match.params.bid,this.state.size);
			});
	}

	render(){
		switch(this.state.status){
			case -1: return <div id="dotError"><b>Error</b> {this.state.error.message}</div>
			case 0: return <div id="dotLoading">Loading</div>

			case 1: return (
				<div id="dotBoard">
					<header>
						<h1>{this.state.title}</h1>
						<h2>{this.state.description}</h2>
					</header>

					<main>
						<div id="dotHolder">
							{
								this.state.data.map((data,index)=>{
									return <div key={index} val={data} onClick={()=>this.handleClick(index)}>{index+1}</div>;
								})
							}
						</div>
					</main>

					<nav>
						<div><button onClick={()=>this.reset()}>Reset Progress</button></div>
						<div>Complete {this.getPercentComplete()}%</div>
						<div>	
							Add <input 	type="number" 
										min="1" 
										step="1" 
										name="addNumber" 
										value={this.state.addNumber} 
										onChange={(e)=>this.setState({[e.target.name] : e.target.value})}/>
							<button onClick={()=>this.addElements()}>Add</button>
						</div>
					</nav>
				</div>
			);
		}
	}
}