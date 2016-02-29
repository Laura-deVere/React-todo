import React from 'react';

export default class TodosListItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isEditing: false
		};
	}

	renderTaskSection() {
		const { task, isCompleted } = this.props;

		const taskStyle = {
			textDecoration: isCompleted ? 'none' : 'line-through',
			cursor: 'pointer'
		}; 

		if(this.state.isEditing) {
			return (
				<td className="each-task">
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type="text" className="each-task" defaultValue={task} ref="editInput" />
					</form>
				</td>
			);
		}

		return (
			<td style={taskStyle} className="each-task"
				onClick={this.props.toggleTask.bind(this, task)}
			>
				{task}
			</td>
		);
	}

	renderActionSection() {
		if (this.state.isEditing) {
			return (
				<td>
					<button className="btn btn-success" onClick={this.onSaveClick.bind(this)}>Save</button>
					<button className="btn btn-danger" onClick={this.onCancelClick.bind(this)}>Cancel</button>
				</td>	
			);
		}
		return (
			<td>
				<button className="btn btn-success" onClick={this.onEditClick.bind(this)}>Edit</button>
				<button className="btn btn-danger" onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
			</td>
		);
	}

	render() {
		return(
			<tr>
				{this.renderTaskSection()}
				{this.renderActionSection()}
			</tr>
		);
	}

	onEditClick() {
		this.setState({ isEditing: true });
	}

	onCancelClick() {
		this.setState({ isEditing: false })
	}

	onSaveClick(event) {
		event.preventDefault();

		const oldTask = this.props.task;
		const newTask = this.refs.editInput.value;
		this.props.saveTask(oldTask, newTask);
		this.setState({ isEditing: false });
	}
};