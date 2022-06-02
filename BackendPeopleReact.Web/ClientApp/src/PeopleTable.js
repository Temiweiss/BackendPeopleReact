import React from 'react';
import PersonRow from './PersonRow';
import axios from 'axios';
import PersonForm from './PersonForm';


class PeopleTable extends React.Component {
    state = {
        people: [],
        checkedPeople: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        showEdit: false,
    }

    componentDidMount() {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data, });
        });
    }

    getAll = () => {
        axios.get('/api/people/getall').then((res) => {
            this.setState({
                people: res.data,
                checkedPeople: [],
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                },
                showEdit: false,
            });
        });
    }

    onFirstNameChange = e => {
        const copy = { ...this.state.person };
        copy.firstName = e.target.value;
        this.setState({ person: copy });
    }

    onLastNameChange = e => {
        const copy = { ...this.state.person };
        copy.lastName = e.target.value;
        this.setState({ person: copy });
    }

    onAgeChange = e => {
        const copy = { ...this.state.person };
        copy.age = e.target.value;
        this.setState({ person: copy });
    }

    onCheckboxClick = (person) => {
        const { checkedPeople } = this.state;
        if (checkedPeople.includes(person)) {
            this.setState({ checkedPeople: checkedPeople.filter(p => p.id !== person.id) });
        }
        else {
            const newChecked = [...checkedPeople, person];
            this.setState({ checkedPeople: newChecked });
        };

    }

    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.person).then(() => {
            this.getAll();
        });
    }


    onDeleteClick = (person) => {
        axios.post('/api/people/deleteperson', person).then(() => {
            this.getAll();
        });
    }

    onEditClick = (person) => {
        this.setState({ person: person, showEdit: true });
    }

    checkAll = () => {
        const copy = [...this.state.people];
        this.setState({ checkedPeople: copy });
    }
    uncheckAll = () => {
        this.setState({ checkedPeople: [] })
    }

    onUpdateClick = (person) => {
        axios.post('/api/people/updateperson', person).then(() => {
            this.getAll();
        });
    }

    onCancelClick = () => {
        this.setState({ showEdit: false, person: { firstName: '', lastName: '', age: '' } });
    }

    deleteAllChecked = () => {
        (this.state.checkedPeople && this.state.checkedPeople.forEach(p => axios.post('/api/people/deleteperson', p).then(() => {
            this.getAll();
        })))
    }

    render() {
        const { people, showEdit } = this.state;
        return (
            <div className='container mt-5'>
                <PersonForm
                    onFirstNameChange={this.onFirstNameChange}
                    onLastNameChange={this.onLastNameChange}
                    onAgeChange={this.onAgeChange}
                    onAddClick={this.onAddClick}
                    onUpdateClick={this.onUpdateClick}
                    showEdit={showEdit}
                    onCancelClick={this.onCancelClick}
                    person={this.state.person}
                />


                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <th>
                                <button className="btn btn-danger btn-block" onClick={this.deleteAllChecked}>Delete All Checked</button>
                                <button className="btn btn-info btn-block" onClick={this.checkAll} >Check All</button>
                                <button className="btn btn-info btn-block" onClick={this.uncheckAll}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => <PersonRow
                            person={p}
                            key={p.id}
                            onEditClick={() => this.onEditClick(p)}
                            onDeleteClick={() => this.onDeleteClick(p)}
                            shouldBeChecked={this.state.checkedPeople.includes(p)}
                            onCheckboxClick={() => this.onCheckboxClick(p)}
                        />)
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}
export default PeopleTable;