import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor() { }

  makeData(data,checkedfilters)
  {
    let currentdata = data;;
    let newdata = [];

    for(let i=0; i<currentdata.length; i++)
    {
      for(let j=0; j<checkedfilters.length; j++)
      {
        if(currentdata[i].group == checkedfilters[j])
        {
          newdata.push(currentdata[i]);
        }
      }
    }
    return newdata;
  }

  tickChecklist(checklist,filter:string,value:boolean)
  {
    for(let i =0; i<checklist.length; i++)
    {
      if(checklist[i].value == filter)
      {
        checklist[i].isSelected = value;
      }
    }
    return checklist;
  }

  uncheckAll(checklist)
  {
    for (var i = 0; i < checklist.length; i++) 
    {
      checklist[i].isSelected = false;
    }
    return checklist;
  }

  searchSettings(data,setting)
  {
    for(let i=0;i<data.length;i++)
    {
      if(data[i].name==setting)
      {
        return data[i].value
      }
    }
    return '';
  }

  createCheckList(data)
  {
    let group:string;
    let checklist = [];

    for(let i=0;i<data.length;i++)
    {
      group = data[i].group;

      if(!this.groupExists(checklist,group))
      {
        checklist.push({value:group,isSelected:false});
      }
    }
    return checklist;
  }
  
  groupExists(checklist,group:string)
  {
    for(let i=0; i<checklist.length;i++)
    {
      if(checklist[i].value == group)
      {
        return true
      }
    }
    return false;
  }

  getCheckedFilters(checklist)
  {
    let checkedfilters = [];

    for(let i=0; i<checklist.length;i++)
    {
      if(checklist[i].isSelected)
      {
        checkedfilters.push(checklist[i].value);
      }
    }
    return checkedfilters;
  }
}
