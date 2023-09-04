import {render, screen} from '@testing-library/react';

import SignInPage from './SignIn-Page';

describe('checking some random stuff in componenets', () =>{
    test('Testing some text in signin page components', ()=> {
        render(<SignInPage/>)
        const ElementWhichiWannaCheck = screen.getByText('name', {exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing by text in signin page components', ()=> {
        render(<SignInPage/>)
        const ElementWhichiWannaCheck = screen.getByText('password',{exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing by text  in signin page components', ()=> {
        render(<SignInPage/>)
        const ElementWhichiWannaCheck = screen.getByText('forgot password', {exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

})
