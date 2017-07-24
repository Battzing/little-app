import React, { Component } from 'react';
import { Button,Input,message } from 'antd';

import './style/App.css';
import 'antd/dist/antd.css';

class App extends Component {

    state = {
        value:''
    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
        var value = e.target.value;

        //判断用户输入的分隔符
        for (let i = 0; i < value.length; i +=1) {
              switch (value[i]) {
                  case ' ':
                      this.record = '';
                      break;
                  case ',':
                      this.record = ',';
                      break;
                  case '.':
                      this.record = '.';
                      break;
                  case '，':
                      this.record = ',';
                      break;
                  case '。':
                      this.record = '。';
                      break;
                  default:
              }
        };
        console.log(this.record)
    };

    handleClick = () => {

        //整理用户输入的数字
        let arr = this.state.value.split(this.record),
            result = [],
            amount = 0,
            balanceValue = 0,
            balance;


        //拿到有效的数字并求和
        for (let i = 0; i < arr.length; i += 1) {
            if(!!arr[i]) {
                result.push(Number(arr[i]));
                amount += Number(arr[i]);
            }
        }

        // 通过平衡位两层的值求出此平衡未
        balanceValue += result[0];
        for (let i = 1; i < result.length; i += 1) {
            let target = (amount - result[i]) / 2;

            if (target === balanceValue) {
               balance = i;
            }
            balanceValue += result[i];
        }

        if(balance) {
            message.success('平衡值:' + balance);
        } else {
            message.warning('平衡值不存在: -1');
        }

    };

    componentWillMount = () => {
        this.record = ' ';
    };

  render() {
    return (
      <div className="App">
          <Input size="large" value={this.state.value}
                 placeholder="请输入"
                 onChange={this.handleChange}/>
          <Button type="primary" onClick={this.handleClick}>提交</Button>
          <p>请输入多个数字并用空格或逗号或句号分开求得平衡位</p>
      </div>
    );
  }
}

export default App;
