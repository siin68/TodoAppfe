import React from 'react';
import Button from './components/controls/Button';
import Textarea from './components/controls/Textarea';
import Skeleton from './components/controls/Skeleton';
import RadioButton from './components/controls/Radiobutton';
import Toggle from './components/controls/Toggle';
import Select from './components/controls/select';

const Playground = () => {
    const [text, setText] = React.useState('');
    const [toggleChecked, setToggleChecked] = React.useState(false);
    const [radioValue, setRadioValue] = React.useState('optionA');
    const options = [
        { value: 'optionA', label: 'Option A' },
        { value: 'optionB', label: 'Option B' },
        { value: 'optionC', label: 'Option C' },
    ];
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Playground</h1>
            <Button children="Click Me" onClick={() => alert('Button clicked!')} variant='success' className='bg-orange-400 rounded-lg' />
            <Textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-4 max-w-[600px] border border-gray-300 p-2 rounded w-full 
             focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <Skeleton count={3} isDanger className="mt-4" />
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
            <Toggle checked={toggleChecked} onChange={setToggleChecked} />
            <Select options={options} />
        </div>
    );
};

export default Playground;