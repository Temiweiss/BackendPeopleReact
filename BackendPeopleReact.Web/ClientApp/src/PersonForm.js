import React from 'react';


function PersonForm({ person, onFirstNameChange, onLastNameChange, onAgeChange, onAddClick, onUpdateClick, onCancelClick, showEdit }) {
    const { firstName, lastName, age } = person;

    return (
        <div className='container'>
            <div className='jumbotron'>
                <div className='row'>
                    <div className='col-md-2'>
                        <input value={firstName} onChange={onFirstNameChange} className='form-control' placeholder='First Name' />
                    </div>
                    <div className='col-md-2'>
                        <input value={lastName} onChange={onLastNameChange} className='form-control' placeholder='Last Name' />
                    </div>
                    <div className='col-md-2'>
                        <input value={age} onChange={onAgeChange} className='form-control' placeholder='Age' />
                    </div>
                    <div>
                        {showEdit ? <div>
                            <button onClick={onUpdateClick} className='btn btn-warning btn-block'>Update</button>
                            <button onClick={onCancelClick} className='btn btn-info btn-block'>Cancel</button>
                        </div>
                            : <div>
                                    <button onClick={onAddClick} className='btn btn-primary btn-block'>Add Person</button>
                                </div>
                            }
                        
                        
                    </div>

                </div>
            </div>
        </div>
    )
}


export default PersonForm;