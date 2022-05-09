import { Header } from './index.js';
function Container(props) {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    )
}

export default Container