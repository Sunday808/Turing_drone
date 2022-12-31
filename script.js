// This script is written by SunDa
// 获取按钮和元素的引用
const button = document.querySelector('#move-button');
const resetButton = document.querySelector('#reset-button');
const element = document.querySelector('#table-wrapper');
const height_element = document.querySelector('#cur_metre');
const table1 = document.getElementsByTagName("tr");
const paper = document.getElementsByTagName('td');
let count=0; // 记录纸带移动的位置
let state=1; // 无人机的状态
let height_num=0; // 高度变量

function set_green(row_id) {
  table1[2].classList.remove('t_green');
  table1[3].classList.remove('t_green');
  table1[4].classList.remove('t_green');
  table1[5].classList.remove('t_green');
  table1[row_id].classList.add('t_green');
}



// 监听按钮的单击事件
button.addEventListener('click', () => {
  // 获取元素当前的位置
  const currentPosition = element.getBoundingClientRect();

  // 计算元素新的位置
  const newPosition = {
    left: currentPosition.left - 36,
  };

  // 使用 CSS transition 来实现动画效果
  element.style.transition = 'all 0.5s ease-in-out';
  button.disabled=true; // 禁用按钮，防止点击过快HEAD错位
  
  element.style.left = newPosition.left + 'px';
  count+=1;
  // main function 
  var readin=paper[count].innerHTML;

  if(state==1){
    if(readin=='1'){
      state+=1;
    }
  }
  else if(state==2){
    if(readin=='0'){
      state-=1;
    }
    if(readin=='1'){
      state+=1;
      height_num+=1;
    }
  }
  else if(state==3){
    if(readin=='0'){
      state+=1;
      height_num-=1;
    }
    if(readin=='1'){
      height_num+=1;

    }
  }
  else if(state==4){
    if(readin=='0'){
      height_num-=1;
      if(height_num==0){state=1;button.disabled=true}
    }
    if(readin=='1'){
      height_num+=1;
      state-=1;
    }
  }
  
  set_green(state+1);
  
  setTimeout(function () {
    if(state>1){
      button.disabled=false;
    }
  }, 500); // 恢复按钮
  
  // 更新高度数据
  height_element.innerHTML=height_num+'米';
});

// 监听重置按钮的单击事件
resetButton.addEventListener('click', () => {
  // 将元素的位置设置为初始位置
  //element.style.left = '28px';
  //count=0;
  location.reload();
});