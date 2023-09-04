import {render, screen} from '@testing-library/react';


import NavBar from "./Navbar/Navbar";
import CardsSpan from "./cardsSpan/cardsSpan";
import ListCard from "./listCard/listCard";
import { useSelector } from 'react-redux';

const email = useSelector((state) => state.auth.email);
describe('checking some random stuff in componenets', () =>{
    test('Testing some text in navbar components', ()=> {
        render(<NavBar/>)
        const ElementWhichiWannaCheck = screen.getByText('Expense Tracker');
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing by data id in cardspan components', ()=> {
        render(<CardsSpan/>)
        const ElementWhichiWannaCheck = screen.getByTestId('cards span', {exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing by title  in list card components', ()=> {
        render(<ListCard/>)
        const ElementWhichiWannaCheck = screen.getByTitle('expenses list', {exact : false});
        except(ElementWhichiWannaCheck).toBeInTheDocument();
    })

    test('Testing my response is object or not text', async()=> {
        let response = await axios.get(
            `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${email}.json`
        );

        const data = await response.json();
        expect(data).toBe(expenses);
    })
})
