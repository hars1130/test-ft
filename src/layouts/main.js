import React, { Component } from 'react'
import data from '../json/data.json'
import moment from 'moment'

import { Button, Header, Table, Modal } from 'semantic-ui-react'
import DatePicker from 'react-date-picker';

class UserList extends Component {
    state = {
        members: [],
        dateOfActivity: new Date()
      }
      componentDidMount() {
        this.setState({members: data.members});
      }
    
    activity_of_date(activity_period,activityTimeZone){
        if(!this.state.dateOfActivity){
            return activity_period
        }
        let filtered_activity_period = activity_period.filter(act=> {
            return  moment(act.start_time).format('LL') == moment(new Date(this.state.dateOfActivity).toLocaleString("en-US", {timeZone: activityTimeZone})).format('LL')
        });
            return filtered_activity_period;
    }

    onChange = (date) => {
        this.setState({ dateOfActivity: date })
    }

    handleOpen = () => this.setState({ dateOfActivity: new Date() })

    render() {
        return (
            <div style={{padding: '20px 40px'}}>
                <h1>Users</h1>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>ID</Table.HeaderCell>
						<Table.HeaderCell>Real Name</Table.HeaderCell>
						<Table.HeaderCell>Timezone</Table.HeaderCell>
						<Table.HeaderCell>Activity</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{this.state.members.map((mem,i) => (
						<Table.Row key={i}>
							<Table.Cell>{mem.id}</Table.Cell>
							<Table.Cell>{mem.real_name}</Table.Cell>
							<Table.Cell>{mem.tz}</Table.Cell>
							<Table.Cell>
								<Modal
									trigger={
										<Button basic color="blue" onClick={this.handleOpen}>
											View
										</Button>
                                    }
									closeIcon
								>
									<Header icon="archive" content="Activities" />
									<Modal.Content>
                                    <div>
                                        <div>
                                        <h4>User: {mem.real_name}</h4>
                                        <label>Date : </label><DatePicker
                                            onChange={this.onChange} value={this.state.dateOfActivity}/>
                                        {this.state.dateOfActivity ? 
                                        <div>Please clear date to view all activity </div>
                                        :<div>Please select date to view activity of that date in your timezone</div>
                                        }
                                        </div>
                                        <h4>Activity periods(showing date of user's time zone):</h4>
                                    </div>
                                        <Table celled striped>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Start Time</Table.HeaderCell>
                                                    <Table.HeaderCell>End Time</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                            {this.activity_of_date(mem.activity_periods,mem.tz).map(mem_act => (
                                                <Table.Row key={mem_act.id}>
                                                    <Table.Cell>{mem_act.start_time}</Table.Cell>
                                                    <Table.Cell>{mem_act.end_time}</Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                        </Table>
									</Modal.Content>
								</Modal>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
        )
    }
}

export default UserList;
