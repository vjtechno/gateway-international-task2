import React from 'react';
import { addTask, getTasks, editTask } from '../../actions/taskActions';
import { connect } from 'react-redux';

const Child = ({ id, length }) => ( <
    div >
    <
    h3 > ID: { id } < /h3> <
    h3 > Count: { length } < /h3> < /
    div >
);

class ManageTaskPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            name: '',
            email: '',
            date: '',
            phone: '',
            status: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.props.getTasks();
        const currentTask = this.props.tasks.filter(
            x => x.id.toString() === this.props.match.params.id
        );
        if (currentTask.length === 1) {
            this.setState({
                name: currentTask[0].name,
                email: currentTask[0].email,
                date: currentTask[0].date,
                phone: currentTask[0].phone,
                status: currentTask[0].status
            });
        }
    }

    handleSubmit(evt) {
        evt.preventDefault();
        let newTask = {
            id: this.props.match.params.id,
            name: this.state.name,
            email: this.state.email,
            date: this.state.date,
            phone: this.state.phone,
            status: this.state.status
        };
        if (this.props.match.params.id) {
            this.props.editTask(newTask);
            this.props.history.push('/tasks');
        } else {
            this.props.addNewTask(newTask);
            this.props.history.push('/tasks');
        }
    }
    render() {
        let StatusDropdown = null;
        if (this.props.match.params.id) {
            StatusDropdown = ( <
                div className = "form-group" >
                <
                label htmlFor = "status" > Status < /label> <
                select className = "form-control"
                id = "status"
                name = "status"
                onChange = { this.handleInputChange }
                value = { this.state.status } >
                <
                option value = "Not Done" > Not Done < /option> <
                option value = "In Progress" > In Progress < /option> <
                option value = "Done" > Done < /option> < /
                select > <
                /div>
            );
        } else {
            StatusDropdown = ( <
                div >
                <
                h3 > All new tasks will be defaulted to 'Not Started' < /h3> < /
                div >
            );
        }
        return ( <
            div className = "container" >
            <
            div className = "template-pad" >
            <
            Child id = { this.props.match.params.id }
            length = { this.props.tasks.length }
            /> <
            h1 className = "text-center" > Manage Task < /h1> <
            form onSubmit = { this.handleSubmit } >
            <
            div className = "form-group" >
            <
            label htmlFor = "name" > Name < /label> <
            input type = "text"
            className = "form-control"
            id = "name"
            name = "name"
            placeholder = "Enter Name"
            onChange = { this.handleInputChange }
            value = { this.state.name }
            /> < /
            div > <
            div className = "form-group" >
            <
            label htmlFor = "email" > email < /label> <
            input type = "text"
            className = "form-control"
            id = "email"
            name = "email"
            placeholder = "Enter email"
            onChange = { this.handleInputChange }
            value = { this.state.email }
            /> < /
            div >

            <
            div className = "form-group" >
            <
            label htmlFor = "date" > Date < /label> <
            input type = "text"
            className = "form-control"
            id = "date"
            name = "date"
            placeholder = "yyyy/mm/dd"
            onChange = { this.handleInputChange }
            value = { this.state.date }
            /> < /
            div >

            <
            div className = "form-group" >
            <
            label htmlFor = "phone" > Phone < /label> <
            input type = "text"
            className = "form-control"
            id = "phone"
            name = "phone"
            placeholder = "Enter Phone"
            onChange = {
                this.handleInputChange
            }
            value = {
                this.state.phone
            }
            /> < /
            div >

            { StatusDropdown } <
            button type = "submit"
            className = "btn btn-primary"
            disabled = {!(this.state.name && this.state.email && this.state.date && this.state.phone)
            } > {
                this.state.name && this.state.email && this.state.date && this.state.phone ? ( <
                    span >
                    <
                    span className = "glyphicon glyphicon-floppy-disk" / > Save <
                    /span>
                ) : (
                    'Please complete form.'
                )
            } <
            /button> < /
            form > <
            /div> < /
            div >
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewTask: task => {
            dispatch(addTask(task));
        },
        getTasks: () => {
            dispatch(getTasks());
        },
        editTask: task => {
            dispatch(editTask(task));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskPage);