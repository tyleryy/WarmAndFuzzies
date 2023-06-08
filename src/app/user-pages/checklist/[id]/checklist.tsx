'use client'
import { useEffect, useState } from 'react';
import getData from '@/firebase/firestore/getData';
import { DocumentData } from 'firebase/firestore';
import addData from '@/firebase/firestore/addData';
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';

function CheckList() {
  // const [checkedItems, setCheckedItems] = useState([]);
  const [checkboxes, setCheckBoxes] = useState([]);
  const user : any = useAuthContext();

  const color = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500']

  useEffect( () => {
    const getMembers = async () => {
      let {result, error}: any = await getData("warm-fuzzies", user.uid);
      if (result === undefined) {

        ({result, error} = await getData("hack-members", "members"));
        result = result?.members?.map((element: string, index: number) => {
          return {"label": element, "id": index, "color": color[index%color.length], "checked": false}
        })
      } else {
        result = result.data;
      }
      if (error) {
        return console.log(error)
      }
      setCheckBoxes(result);
    }

    getMembers();
  }, [])

  type checkbox = {id: number, label: string, color: string, checked: boolean}

  // useEffect( ()=> {
  //   console.log(checkedItems)
  // }, [checkedItems])

  const handleCheckboxChange = (event: any) => {
    // console.log(event.target);
    const { id, checked } = event.target;
    setCheckBoxes((prevCheckedItems) => {
      let checkbox: any = prevCheckedItems.find((elem: checkbox ) => {
        return +id === elem.id;
      })

      checkbox.checked = checked;
      addData("warm-fuzzies", user.uid, {"data": prevCheckedItems})
      return [...prevCheckedItems];
    });

  };

  return (
    <div className=" bg-gray-800 bg-opacity-50 border-solid border border-gray-500 inline-block p-6 grid-cols-3 grid gap-2b">
      {checkboxes.map((checkbox: checkbox) => (
        <div key={checkbox.id} className="flex items-center mb-2 p-2">
          <input
            type="checkbox"
            id={checkbox.id.toString()}
            checked={checkbox.checked}
            onChange={handleCheckboxChange}
            className="h-5 w-5 mr-2 "
          />
          <label
            htmlFor={checkbox.id.toString()}
            className={`px-2 py-1 rounded text-white ${checkbox.color}`}
          >
            {checkbox.label}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckList;