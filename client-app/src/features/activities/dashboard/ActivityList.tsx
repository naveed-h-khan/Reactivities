import { Button, Item, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent,  useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer (function()
{
    const {activityStore} = useStore();
    const {deleteActivity, activitiesByDate, loading} = activityStore;

    const [target, setTarget] = useState('');

    function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} 
                                        to={`/activities/${activity.id}`} 
                                        floated='right' 
                                        content='view' 
                                        color='blue' />  
                                <Button 
                                    name = {activity.id}
                                    loading={loading && target === activity.id} 
                                    onClick={(e) => HandleActivityDelete(e,activity.id)} 
                                    floated='right' 
                                    content='delete' 
                                    color='red' />  
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})