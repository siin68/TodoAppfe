import React from 'react';
import Button from './components/controls/Button';
import Textarea from './components/controls/Textarea';
import Skeleton from './components/controls/Skeleton';
import Dropdown from './components/controls/Dropdown';
import RadioButton from './components/controls/Radiobutton';
import Toggle from './components/controls/Toggle';

const Playground = () => {
    const [text, setText] = React.useState('');
    const [toggleChecked, setToggleChecked] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState('optionA');

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Playground</h1>
            <Button label="Click Me" onClick={() => alert('Button clicked!')} isDanger className='bg-orange-400 rounded-lg' />
            <Textarea limit={200} value={text} onChange={(e) => setText(e.target.value)}  className="mt-4 max-w-[600px] border border-gray-300 p-2 rounded w-full 
             focus:outline-none focus:ring-2 focus:ring-orange-400" />
             <Skeleton count={3} isDanger className="mt-4" />
             <Dropdown
                options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                ]}
                onChange={(value) => console.log(value)}
                className="mt-4"
            />
            <div className="mt-4">
                <RadioButton
                    label="Option A"
                    value="optionA"
                    checked={radioValue === "optionA"}
                    onChange={(value) => setRadioValue(value)}
                />
                 <RadioButton
                    label="Option B"
                    value="optionB"
                    checked={radioValue === "optionB"}
                    onChange={(value) => setRadioValue(value)}
                />
               
            </div>
            <Toggle isChecked={toggleChecked} onChange={setToggleChecked} color='blue' />
        </div>
    );
};

export default Playground;