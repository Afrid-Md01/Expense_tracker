import {render, screen} from '@testing-library/react';



import NavBar from './Navbar/Navbar';
import ProfilePageBody from './ProfilePageBody/ProfilePageBody';

describe('checking some random stuff in componenets', () =>{
    test('Testing some text in navbar components', ()=> {
        render(<NavBar/>)
        const ElementWhichiWannaCheck = screen.getByText('your profile');
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing by data id in navbar components', ()=> {
        render(<NavBar/>)
        const ElementWhichiWannaCheck = screen.getByTestId('profile navbar', {exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing by text in profile body components', ()=> {
        render(<ProfilePageBody/>)
        const ElementWhichiWannaCheck = screen.getByText('Name', {exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing by text in profile body components', ()=> {
        render(<ProfilePageBody/>)
        const ElementWhichiWannaCheck = screen.getByText('photo url', {exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

})
