import React, {useState, useRef, useEffect} from "react"
import { FaPlus, FaMinus } from "react-icons/fa6";

const UnitValue = () => {
    const [ tab, setTab ] = useState(1);
    const [ inputValue, setInputValue ] = useState(0);
    const overlayRef = useRef(null);
    const tabRefs = useRef([]);
    const stepValue = 0.1;
    const minValue = 0;
    const maxValue = 100;

    useEffect(() => {
        const currentTab = tabRefs.current[tab];
        if (currentTab && overlayRef.current) {
            overlayRef.current.style.left = `${currentTab.offsetLeft}px`;
            overlayRef.current.style.width = `${currentTab.offsetWidth}px`;
        }
    }, [tab]);

    const handleDecrease = () => {
        setInputValue((prev) => {
            if (tab === 1) {
                return Math.max(minValue, parseFloat((parseFloat(prev.toString()) - stepValue).toFixed(1)))
            } else {
                return parseFloat((parseFloat(prev.toString()) - stepValue).toFixed(1))
            }
        });
    }

    const handleIncrease = () => {
        setInputValue((prev) => {
            if (tab === 1) {
                return Math.min(maxValue, parseFloat((parseFloat(prev.toString()) + stepValue).toFixed(1)))
            } else {
                return parseFloat((parseFloat(prev.toString()) + stepValue).toFixed(1))
            }
        });
    }

    const handleChange = (e) => {
        const val = e.target.value.replace(",", ".").replace(/[^0-9.-]/g, '');

        if (!isNaN(val) || val === '-') setInputValue(val)
    };

    const handleBlur = () => {
        if (inputValue > maxValue && tab === 1) setInputValue(maxValue);

        if ((inputValue < minValue) || !inputValue || isNaN(inputValue)) setInputValue(minValue);
    }

    return (
        <div className='bg-[#151515] p-4 flex flex-col gap-4'>
            <div className='flex justify-between gap-2 items-center'>
                <label className='text-xs font-normal text-[#AAAAAA] min-w-[100px]'>
                    Unit
                </label>
                <div className='bg-[#212121] p-[2px] rounded-md'>
                    <div className='relative gap-[2px] flex'>
                        <button 
                            className={`text-xs font-medium min-w-[67px] min-h-[32px] relative z-[1] p-2 ${tab === 1 ? 'text-[#F9F9F9]' : 'text-[#AAAAAA]'}`}
                            onClick={() => {
                                setTab(1);

                                if (inputValue > maxValue) setInputValue(maxValue);
                            }}
                            ref={(el) => {tabRefs.current[1] = el}}
                        >
                            %
                        </button>
                        <button
                            className={`text-xs font-medium min-w-[67px] min-h-[32px] relative z-[1] p-2 ${tab === 2 ? 'text-[#F9F9F9]' : 'text-[#AAAAAA]'}`}
                            onClick={() => setTab(2)}
                            ref={(el) => {tabRefs.current[2] = el}}
                        >
                            px
                        </button>
                        <span 
                            className='absolute h-full bg-[#424242] rounded-md z-0 transition-left duration-300'
                            style={{ left: 0 }}
                            ref={overlayRef}
                        >
                        </span>
                    </div>
                </div>
            </div>
            <div className='flex justify-between gap-2 items-center'>
                <label className='text-xs font-normal text-[#AAAAAA] min-w-[100px]'>
                    Value
                </label>
                <div className="bg-[#212121] rounded-md flex relative">
                    <div className="relative group">
                        <button
                            className="w-[36px] h-[36px] flex items-center justify-center enabled:hover:bg-[#3B3B3B] transition-bg duration-300 absolute left-0 rounded-l-md"
                            onClick={handleDecrease}
                            disabled={parseFloat(String(inputValue)) <= minValue}
                        >
                            <FaMinus className={`font-normal text-base ${parseFloat(String(inputValue)) <= minValue ? 'text-[#AAAAAA]' : 'text-white'}`} />
                        </button>
                        {
                            parseFloat(String(inputValue)) <= minValue && (
                                <div className="px-2 py-1 rounded-md absolute bg-[#212121] z-[1] bottom-full left-[18px] -translate-x-1/2 mb-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                                    <span className='text-xs font-normal text-[#F9F9F9] whitespace-nowrap'>
                                        Value must greater than 0
                                    </span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                                                    border-l-[6px] border-l-transparent 
                                                    border-r-[6px] border-r-transparent 
                                                    border-t-[6px] border-[#212121]">
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <input 
                        className="h-[36px] rounded-md bg-transparent w-[140px] text-xs font-normal text-white text-center hover:bg-[#3B3B3B] transition-all duration-300 border border-transparent focus:bg-transparent focus:outline-none focus:border-[#3C67FF] focus-visible:outline-offset-0 focus-visible:outline-0"
                        onChange={(e) => handleChange(e)}
                        value={inputValue}
                        onBlur={handleBlur}
                    />
                    <div className="relative group">
                        <button
                            className="w-[36px] h-[36px] flex items-center justify-center enabled:hover:bg-[#3B3B3B] transition-bg duration-300 absolute right-0 rounded-r-md"
                            onClick={handleIncrease}
                            disabled={tab === 1 && parseFloat(String(inputValue)) >= maxValue}
                        >
                            <FaPlus className={`font-normal text-base ${(parseFloat(String(inputValue)) >= maxValue && tab === 1) ? 'text-[#AAAAAA]' : 'text-white'}`} />
                        </button>
                        {
                            (tab === 1 && parseFloat(String(inputValue)) >= maxValue) && (
                                <div className="px-2 py-1 rounded-md absolute bg-[#212121] z-[1] bottom-full right-[18px] translate-x-1/2 mb-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300">
                                    <span className='text-xs font-normal text-[#F9F9F9] whitespace-nowrap'>
                                        Value must smaller than 100
                                    </span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                                                    border-l-[6px] border-l-transparent 
                                                    border-r-[6px] border-r-transparent 
                                                    border-t-[6px] border-[#212121]">
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnitValue