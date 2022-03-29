import { ConnectedObject } from '../../../types/ConnectedObject';
import MenuButton from '../MenuButton';

type props = {
    to: string;
    text: string;
    icon: string;
    objects: Array<ConnectedObject>
}; 

export default function ProductButtonList({ to, text, icon, objects }: props) {

    return (
        <li>
            <ul className='space-y-3'>
                <MenuButton to={`${to}`} text={text} icon={icon}/>
                {objects.map((object: ConnectedObject) => {
                    return(
                        <li key={object.uid} className='pt-2 pl-1'>
                            <MenuButton to={`${to}/${object.uid}`} text={object.client} icon={icon}/>
                        </li>
                    )
                })}
            </ul>
        </li>
    );
}
