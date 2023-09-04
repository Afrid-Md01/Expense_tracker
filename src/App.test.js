
import { useSelector } from 'react-redux';

const email = useSelector((state) => state.auth.email);
const expenses = useSelector (state => state.list_data.Expenses);
describe('checking some random stuff in componenets', () =>{
    test('Testing some text in navbar components', async()=> {
        let response = await axios.get(
            `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${email}.json`
        );

        const data = await response.json();
        expect(data).toBe(expenses);
    })
})
