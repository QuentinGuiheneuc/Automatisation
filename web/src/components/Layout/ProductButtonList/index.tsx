import light_icon from '../../../assets/icons/light_icon.png';
import MenuButton from '../MenuButton';

type props = {
    to: string;
    text: string;
    icon: string;
}; 

export default function ProductButtonList({ to, text, icon }: props) {

    return (
        <li>
            <ul className='space-y-3'>
                <MenuButton to={`${to}`} text={text} icon={icon}/>
                <li className='pt-4 pl-1'>
                    <MenuButton to={`${to}/light1`} text="Light 1" icon={light_icon}/>
                </li>
                <li className='pl-1'>
                    <MenuButton to={`${to}/light2`} text="Light 2" icon={light_icon}/>
                </li>
            </ul>
        </li>
    );
}
