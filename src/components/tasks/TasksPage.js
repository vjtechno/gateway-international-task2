import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../../actions/taskActions";

class TasksPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            date: "",
            phone: ""
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleDelete = event => {
        this.props.deleteCurrentTask(event.target.id);
    };
    handleEdit = event => {
        this.props.deleteCurrentTask(event.target.id);
        // this.props.editCurrentTask(event.target.id);
    };
    render() {
        return ( <
            div className = "container" >
            <
            div className = "starter-template" >
            <
            h1 > Tasks < /h1> <
            p className = "lead" > Here are your tasks. < /p> <
            Link to = "/task"
            className = "btn btn-primary"
            title = "Add New Task" >
            <
            span className = "glyphicon glyphicon-plus" / > Add New Task <
            /Link> <
            table className = "table table-striped" >
            <
            thead >
            <
            tr >
            <
            th / >
            <
            th > Name < /th> <
            th > Email < /th> <
            th > Date < /th>  <
            th > Phone < /th> <
            th > Status < /th> < /
            tr > <
            /thead> <
            tbody > {
                this.props.tasks.map(item => ( <
                    tr key = { item.id } >
                    <
                    td >
                    <
                    Link className = "btn btn-primary"
                    to = { `/task/${item.id}` } >
                    <
                    span className = "glyphicon glyphicon-pencil" / >
                    <
                    /Link> < /
                    td > <
                    td > { item.name } < /td>  <
                    td > {
                        item.email
                    } < /td> <
                    td > {
                        item.date
                    } < /td> <
                    td > { item.phone } < /td> <
                    td > { item.status } < /td> <
                    td >
                    <
                    div onClick = { this.handleDelete }
                    className = "btn btn-danger"
                    id = { item.id } >
                    X <
                    /div> < /
                    td > <
                    /tr>
                ))
            } <
            /tbody> < /
            table > <
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
        deleteCurrentTask: task => {
            dispatch(deleteTask(task));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);