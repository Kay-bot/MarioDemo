var canvas = document.getElementById('canvas');
var graphics = canvas.getContext('2d');

var marioWidth = 32;
var marioHeight = 32;
var marioPositionX = canvas.width / 2;
var marioPositionY = canvas.height / 2;
var marioMoveSpeed = 5;
var gravity = 10;
var jumpForce = 20;
var maxJumpForce = 20;
var jumpTheKey = 1;

var marioTexture = new Image();
marioTexture.src = "http://vignette3.wikia.nocookie.net/fantendo/images/5/58/8bitsprite-1-.png/revision/latest?cb=20151029181053";

var garfieldTexture = new Image();
garfieldTexture.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASMAAACtCAMAAADMM+kDAAABUFBMVEX////1njYAAAD775r9ozj6oTf/pTj5oDf/9Z7/pjn/+KD+8pz1gyDhkTLwmzXRhy7qlzS6eCn90bDLgy2VYCHDfitVNxPajTCmayX5+fmjaSSCVB2NWx/kkzLk5OT19fXW1ta0dCh6enrFxcVgPhV2TBo+KA55ThtGLRCRkZHn5+dpRBdePRUZEAZoQxctHQo1IgywsLBQUFCenp5QNBIjFwiJiYm5ublHR0c7OzsOCQMgFQdmZmbs4ZEfHx/X19dtOg5ycnKQiVjmex4vLy8lJSVMTEzAt3bZzoWooGempqaiVxVdXV1rZkLIv3uel2FZVTdEQSowLh59d01NLgA6Hwe8ZBnTcRxFJQmERhHKbBoABhEsEgBAIwAwLR0ZGA//2H3/0HBjXj0eHAUREgwlAABPQTeeg27Kp4zkvJ6cgWxxXFAwKCKGb15FQByrWxYuB1JEAAAgAElEQVR4nOVd+V/b2LWPDvdeITuW7VqyjBfwghew8QIYsCEwMCQQJpO1M+10melL89pO32vf///bO+dKsiVZYEPsAOn5zCQBjCx9ffbtPnkyJ1qp7G0fAwz2ivO64tdG+9swosHmfd/NA6S1DUTmh9+PUTq57zt6aLSCCB1+9+23WwjOcMsGaeW+b+ph0RWy0I9Pn/5OYpN1GKl833f1kKh4DkNEyIEo1Xal7b7v6x5pdefVJ4DzctH5+hTgu6cjiDIJgG5G/rNyn3d5n9Q7H9uuVfy6AvD7bwmib+X36loOIJ6BXQNg577v9X6oRzp5bLsqT8oOEz19+gN9oyE4QFWrQxK10sZ93+190OoAYLfkwQieww/f2hD9JL/WuQl9ReuCXgfYc3+vcrV2n7f9JQnte8fkffDSNzZCT/8gvzI5q4PFdahpuyM+qnz6j1FNawdo1pmWBp+4/ehgJH2inFA4JJlqQkZsufoIpfE/RTMVUcwKTBiEhWHi/wDEUT+5kpYeQpcrSjyPOBnAFfzZPv0eWr0Diksqp+dfOzOhsjaEolpSMWt5WMd/8XUUvqeOTUPYYqqixBAn1kqyOL6uiL+3YzPRDv3eVx7CoSpKCXz6Dj1rTOtDiTBCXECq7G8gU0JBVGxSTcaTdjCyKpEq0m+9+sr19h5sFYhBZJhhiBgaMGQUVD625f8WtrRqTSguqSRucI6/+IJCW2KiQZGuU+x9tfK2A4c6ypGiE0R9zrOQ1pCPFNFCB1KyUUmrkaSNiNWTFK8VyaCR0u7hVTbpH7B63w+zGKrAMEEAiBw9ZJKLNJSYRWAZUthQG3GpiLxkksp+dUo8CGWUurVTaQe37/thFkObqIEIADVhe9IK2iwdtXdaqKa0/j+BwRTVD5Fow9qTNVRJPds5Ink72Nsp3vfDLIgG6BpK+ZFslFLVFLSFGgODo/DFc988RciUCSJ1dFVGgLdJdT+Hg/2vOJ+0Q66h/dhIaen+mKpagIKqsHWtBD9CXVo0zoRQ8X/JcyapoxeVJ88pi7ThqOyvldZgyxYjngG0/HFVEbuHCFqiiX+oKZaELYjhT0Us25bOdtqwhIo4Hjx5Ak96R3iFc9ub/Hqp7EiaIhpQh10CBtU2iZ608qSSWhrTs+h0t/PZbI5ilUaKQpbn24Aoocb/2hOSaxIWohgMs6iN0Nfujj0h5CSATAGD/LwlGOMobzyFXx1CulRFthqcbBx/9cn/DYJFiloWjGqH2MgseGwY6m6ivMJG31SZjj5BlwvkPPKvv1q30aU/dp0IQ+xCbFiS+thFQ+Wcq6TJazEPZ0kTmGhCJ2E5uYHz3n0/xUKpCFnHN9ShL8DjJ6pCiSdLSQv5qCUCzhH9FAO2OK86KB1/zUp7DxzBQr2TK+TYGANzfZRDWldZECOUzUQXMprVcl7z6uv1jo7dSBWNeTJecAEQKUoAtKq5elumJfP6JEoqX4d0QYs1bJD++JUGamjV8s7DszYUuCtSJENGTENDxpjQTZIoQ+ETKFF8t17KS4iGedij/NFm8WszcxXbFSKMujCWog4YHvHiQqecSYZNaCXNxgdyeg302J/cHO9R8b6fa560A6OMB4ykDh2loB3jKlr7mjUhcBp+Ox2vQYnnU0JDf+n7s7MP7xGl+36wOdKpyzwY87dsXDBQ6+gTHKOwAnrWWRH8tshT2rIETcHif4aL5cjyciRy+QGOv56k5ACcp1bjTuCq6lsQAhHBkSULN/FddLpLjCXjiT+/W1peWlqKLkWjkdcAXw1I4IYdGJbZhp810O0JgwjhiKN3PYEfQ/7aTSQ0eBeNEkSv4TK6tPwMBvf9bPOiUbDGk7aFQ9nJTQiUSzyx5WQsvaR2oSrAgGcE0VL08udn+NfyBVzd98PdgVaujrZfbfiCqzVKF9mPn5EYqZTpv55UvT8JEqUvSyXURUsSpWiE/liOvH2ErTdF12veGGuKzTEf2Rix/shhuhakTjBtyxHY6rvI8vdAHCSZ6eWbyMUjrG9vjGv4o36PVZm9djDKaTr+CbFQhe1lmt0giqTNX0ejly+jDkaRXyCyNG6ZeDxU2dkovxrYXp7zEa96+ahaclP+NxG3YFJjiV0StejykstHl5fR6GN0klbW1tYo8DzpnQJsS4FbhbbDE5wAyuEfxjVGbUQsCW7mckwJeBdx8FmWDgB6APDqnh/41tQ7tuVssEc8dFKWVcPVESRUts5pGrgZtxuIorRgnYTlUdhsiN68lD7A0rNHJ2sn4KEjhGnt6OBkdXvkLqop6DJFBUhMgwjx7EBzQiLhvc1I6B+9l1i9fHQ6e2XgBQmoDWYfMOgQbjrEgjjVi2CKOpJ4okpKBaSNGQ4jLaP7+CGytBx9lJ722ubm6mqxUtnv7ZRfwaBSgUOu5Uf6h3SMNVVlS0JH8zCokXR4Kxnp7Bl6Rn/5y3+hantx3098e9qs7OyVy3s7vSJp7grqp5xVG3uMqvQgmzd5RyPiW+NGGxe3JsUgS8tv4RcwmJqH4fCx9ZRu7h17RO1Ted/xl7JMHStpDNqqs2GUnHDH8XfPyKKhJ9nWlEJJ1+qPbKTEcSCfvzjd20DaO3XVk8pMS/U8+mwYKaJGbRJ+kOAX6R9FPoKlqmrmEOwOpUdDeL8vdoretLzdqV4SpseOz44RVSaDsNnChpbtfZ/jlRpdsNuSHgud9AJGZlNC1NUKkPIkZZMz6iNZ+M741TZ6oW8kI0WfIY+JVlVW3+7ncedDtvCltFpVK41lzRzlAaYRwtkPwBlzLBu5RglVr2tNqD7KBIlLMmxraSVQsnmuOE4S2rXOjBgp7DDokqtDcEPad+hjcgRN6z9iRrITJTEBVR0w2i85YkO9tDNixI2g7sLA1lZIGNLKyiaPi8yjc7bHtEcQNbUkxKo5xvruY+oAhanxmsM1iaDWZjl4uewykkyOq3jBx9sfKZ0lS0vXBFg8ZitqBEdgSD8jRopIB17LM7aHRIx0YeNHkfIjjEgkSavWEjqU4sCUQkpVmdATitBaoxaJqYR2LOcTNlTjH0cJEpDii27UozL/XupJo8ZMUDP0nFykqqTEO1WA9VmVNgpbx4cRhrqjJFLkw5/pOoyaJe77Ye9IR3jvW5wbLS0TUxWe2PXEKbPyETGJL/2PoP3iZiKjr6VrSgNcj9WyUWE+z9h6hnqwGPrMcHa5FFm6/AiyaXQ2YvlRs4BNqPFH2dol/JnKkzR3W7zvp70TbcJQQe+G1SihxhGis+hyNBrB/85gIg67ljCK9Sd2+XCMUeR9TqREkzLAj9ONrEBdO6QPXpXlfbiQauQdejeRd9CdFSMlMcqG25hxDx8tf/hBq8Zz1Fdyet+Peyfagaxwoy1Wg9e2pqVEInp/YM1s/Q9rHoyYkhvro6XlNyCyuVJ/95EF/yMqo7Jwc/1ZeBmxiz7LUen9BSz6DcSaMHopU6hFaWTXqJatJ2smUCvgo+wCPPAoZvg+En39ctnzbDcVs33E864R5CoitFOGD+MK2wUkUsMYUMf7oxyP/DSSJ2SjZ9HIWxh9/ktRCCY9rseoZFdRJEJXtJTEh3XCggQ0H6tho4K1nVkTMuezPDbZpEiCSY/rSE1R4VsiJOdEj53WEecyiQSoUAd4lMMkawB6xg46UzBGZ8l5QIDSbIykxiAmCCE7uV9xS2y2XQOFtzWa7n6Uxp8wqspCP8u99UjZJbxGjlp+iS74bBihKBkUw9ix/bZH1NA/6giFCUjC41y5gRgl0l3Kgomh57GQgaKXqHWX308UhkKJM6er1lbKqzCMjvF+Js0jAxpxD9S014qVyoPv5UaMrGFH6E0M/C/Iv3Yt0fvIX8+WpY800aw2wUNMd1dFOXNHR9Q6MhK1l7JvgtUpqe0b3eod2NWrB54OQIwa0NcsQHV0EblwyxnP0L+R4hL5MC2tzYWFyri8B1crbst6EZ2IMUtGfrY9CBY/NNDRXtvfK8u1LTLhAHJU8KD4ZK3S6z3QEtwK3eJQmBAvwZvI5Vun+yzy5ocf7KJ99BfIXC9tXCiZmmyH2/S4PvDzWNIo7Lc9UTVVSsGrss1we70BHBpxhTFWcJkQ2fBhZnPlvSkmZDIoXtHRx89F3OYpYikrXG9zpibbrh5eHScZD/665MEo8p7GS4kSch6+nkqoheRv8V8Je1hA5eo6QDUWN4Ky+FBI1h8TMcjhp/ky4hp+nSJ5W+7QAxyGjGIjByXlNJazHLJC4+uVqx30sN95IUJtVHWFFeNBiAtVRVg0X3eXaMG6pjJef5ggHclstgINSl28kb35y39RZLbVqWxEzqDmbw3ljMeyziCWm1osQ/nIkZiXHmVEbDhS+hwg6cotszw/UJ0CA41TPEAvU1ZFklpHei/w6cObsw+f/ltqD7cbbSnyPew63RKqygWPlaqHrgY5cC6zJr/629//8euvf3fBlb/7duQ8qFzxluxY0tO8www7/0QLO+4VjlDap2cztCrt68nYTk5DftjW2H4vf4SGwjgTLGEa9rhfubdx7nUJyYr/89ffSPqf78fptTc2EJScMlOWL4+AeIyiwVFCvPAQGWmVnriqZcGsgSUUA9Z1LUYlbX1U/ZEgbRmZ3G8lPINyz3b7VkaJjhXE65+/cWkc8i9f2g2DaopxMewY/hA55kkriJpdzRPNh9iCS4/d0VKQNeXOA7OR70KeU4jriU3QTSLds9crhiY3zuF/fx1B9D8jWSNlRI2AvJQvrcvNE74EufBUp1jOToijGhx+aQSm0yu6d12BupaUN56BraSM39rgteAvb9jU04O/jRD6zd/gbGQe/woZKWmQ6MqIFvyqPzmuONG0vJwDjz1EhXRF925qtZYz2sjtJSJ016+9IF1+gr3wLOIKDEcI/QNcHzsaefYL5AkiUa3GbQ2fZ35PazxJ4LY7UVn8CwMwA8k6bV7LBztE8RP1RhRL0eiH8NTGygD+5SL0vwC/RCQtX35whgDQQpJjJP0wNe8FSTRGFSduwjqz3/X4i0Mwncg+dUVqopNGdDx5MpuV3sIfe0FeIsN4jNro13/8i2Bod+H9248f3/0C7pyE6FgmyMpRXctueeMa1hwpceQjiRH+/RBrJxs0HRxj6WBUhsJ25mUkEh+qTB5s7Bc314hWi71T+PcFGniH3kNTY5ZhT7APkw7qBdE9pK5RsCz/VACrezGS3Rgi/SA7cDZpdbHBwlY/BRhJKpmXb2FM/37zLBJdirz+OISfP7589oZcZ3Qz9VQmm+Ij50cBS253o2q2t5kLzcJI1ux5MJGE5/eNRygNoDCaOfISOr9v/Yy0JCf2opcXb87Ozt5cXC5Flu1cCv69HIlceHxq7jdhtkJKg9+L7Ix0Ntr+DJdLOR5mgqQHRqbhbMdCX9qjVTGCmwBJqu9lSX4mQ4ex4ZdXFyZWoL7aXVPQDgDPz2OjEV7yIdvCosrJA024oZagoobQk/l2q2lY7o1TW9Xr5RCQwoh86sAQsi79IS43TTYtcil0ucHUIa09UkdURSfqph/qvts92o7FkmlXy7RHwoCa9nI2kCKXE3kmUUc2UYXZR4Ri9robGo2LuwuEMu5mMznjZYh4KS607AOtnaCL1DQolK+XUvFkDqNa92E5mqjXYeI2AdHFBETcggwTKbxCesSZCu0JTgnOuVDy4wwSvhTFVCUdJqoPdLm0jEfAwNiekh+FcXlWVTr+fFA4kX/ZLwQgwsuoFvLmoeldmURqOZ1JZmR+Li6kahcxz4Q37zzMije1Hw9HHzbLeDI7Olqk75dulDd0m96jfPp1ES1D3pJLbngAO92wJZq8qPVkQlVjedgdazKaiHuIOxPoUBV99Ci+wX5VpZT1RSR6PULPPtCwiQ8IRZQcIGKTBQPG46WMqQul7ui/mp/T8g9Qb6+dg6+KRhh5PEr5uO8vIsthMNkIreuBqgB60OvUNpid3Ewm38F2n0QyPew0MwkR4DR4cF3Kss/fu1ckOJFGS+kwVkWX2g8Tuo1LF+h1d1NBJNCBTqlbUCtMqfFyIdAfC8JI7/+wUv8Vqa69ooI+b80nOqrt3cG7s9dL6E5L/zGyvHT58iNJkxnCKyWub2FwMWsXXIBE92ExUoWUp7+5mvVHEQNtPKTPWRWJrB1O/Pzue4xDzj68fS+/zMUDguKwQoKM1t0QshnpAbnbq/gsTf8eA1JH9mQDU+KlbDZpSZTQJyhVO554Fhr5uHoNq/B+OqiibgXSVshsydpqpdLb2dnY2Lnar3xJ7+AY8kpAsmgtNP0tYmR3qB7ftReLqRjO6XEzYyCVzJgiJjTJiHTzrnJmY2T4hG2zsnPqn7cHStEUvwxEZeiLbLAPC2RunpO/baKhjlU9pUNb+kgAb8bgcxCyw7cNB569Fx5gurvp9XZ7Pd2wV6XsfQF2WpXjj/7GUNrIksmyBIpVxtY15BrP3IQ8HxK76CNVeqcuNuv5jBlPUFrC3sEoUA1kyHErL7xR95UcOGr5RE30IasxWlU/Wt2HrNaauZt9LsSzXrEqkYcQ5FyqGCdrCw/uVgkH018YlGv7CwqqocT42+xw5ibkOZHlgWhyzaJLnPzbxbYP7sGuwE/MXxhMQx9qDefoA/ebjS+NER+fsnRjsyGLLXgFxTEk6ewr35ta8Pun34FXSytURLxhcmQhmkqMtgh3bpZySi8s0JfaJBvP2lsBHxu+efrTuGdIohB3is4hLg/XZ54ovQ1xw8UoOcXPomTp4tpOK6Stxa5fHcMPv6Xt874qiWgSr6kWKs8gHmjzJhZpzYPkGUpEh1ONhagusJayQ9whanXPXdCH8uMPwRGIGOQ0NC2iALsJ/0goSmpci88LGO+VXaU9w0yvvsBcyh6xgKh5h/PwmX+a0AHUOPWps9s0YlrWd88s1umovLq+AL/APicHZpqfZ8bi5pnKYNH6VO9Ti07/6f8FdACy/U8/fid7j5pc86SZaM1hPBMsGM2JdCf9NlNgvDhGKtOHxPNenSvgu6e/87MR9Sp+8+3Tpz/KWEB30z2qiNsBbn0x3qVj/KeuFiRCQ7MojbRhM7LPO+r/gQ4P8zV3pH2nh+ezJjq9jMVbYKjxbCa4XXteJOyDuKevFlTs8G5Bpu1qcu6a1f/vRxj6IMrC739Hn2k33ayuy26HWt6ob0EnLijAnSMsPnIwCulCCHtxa1FdlJXJwSvKHfm0EZfdVYf5lMIomhSqlZU3v/55yY8ZHlu+TXc2LkVzfDD9ee9CayHjsizTzXhP7yHVmU4xDyByxCinLToPwKQ+mnGVF2mv843efnH+5u15iIPGRUAZ1eJBx1HLzTxC+hk0u8pWbPMvaXA1Z5j2pqlEXoJMSEZfn31e+86U8AQiqPZk0kgeRBX+8hhtbyzlOnNPKZ1M27qSCPjVDvHFp5Oc46dSCIsSMzNGrtlKp9PtnJG0eNh7iwaGmJwJi8Z25hrjDqZsFNHDM9aFxfORTGMBtLLVLgRoWA+p/dK2b9m7LKgYOM+WysottmWMCYPImZe13JV4KQiNl0L2oOiuLyWb4eZp5V7ccKrBdSQyIauO5032mZ3X0qTNEOvjo4isuW5a2gwk06aTKoxxe9LiSKRvxAgm+BijysNR40tqro1e++BdnDmdWKwGrcVD5M3VhtLk2gGVxvAcotaT+WFEbTXm7JJDbWjGwgVtZNaup8l8AKt6vCl1ONd6ycZk89D1lIaO9QUguk5l1zIxlYboaiEFP7SEY+DQp5xrJaCH7tdMsamqd/CVX6QYyephECWd6jnnnZCjT7h3+NSa80jFySfohzXIBEhV+ujTzRmMa4h1JhHqjgt+IRtypSn0aKm59wvuAeymQptkvPfQ6H5OL8itKEQd+eeew4Qt5ak488O5dzCtHuFNlJSbYBK5a84ZWwD5S9mSOv6baYWEu8LbfreINu/VMt5Is6RT710YFDw+65qfOZDYDUK07k+2IYiTEy7uvKnizA0sog6wTwP6f6pnUjGVO0eqe+5qa+ZV0Z9NsijSb7SruWwpmbKQ9OAAYtiZXihs7lp0an757YI6mE965cEfbd6u5XzFkexiao2hRAFqTp5kKhud1DDGDkt1j4WNb+1q4k+L2yJYBEibqbjlP6Vm9o3jn0909vaUqBljlUmFhMJmA4d+tqVyc3HLqE/x0+CBzw4/2S+njcjJHk55N+Tr1sSHhhIokzaiBCUaGBwubBgOQvwz9FfmBsFUooT5jafjKbZCCpkgGBK23LBnm9ARXdAI035Iwcb9gL4M0Rbp2NRXhZ2gZwsbN2whQOZfUGvStr+vxn3vhWfVRkQtI5NyFCRUSJNdN85nOZ5j9pe4V4v7vauNPaSNq17l5M5O5lpYfyjrT29xmRtpYRHrBKFA5Sd1FtvyKDLEyKlMrhWvytshAeBBuXeXztwrqGnBd0YlGi5q6gL0OGma9nQbii8LYTZUZWOGR72+iu7M1dHoeCfyueq5XD6XqzZ3+843y7fOohyEGDBeCi8ycWsBxo587KmrBBWZU5vECOP9Fjq/9geKDLlj760a7uYyZizhdC7bhE5yIl7KyQmP0+JtINoMW+OL6ijsLllq9pMjZiZacx7SJTqZksGQbeKcQVXYrV1tDKkEt7c57ebNBA+ZblLkxismdJPyMINb9AtcheXzRSNs/yF6IbcvGEwlVgvrOeI5MnS+5ww2BCsUpeVhPaUnDBi22xTyNYyUEg6P90JMpXHr5zOL3EFYjyYP67gTxkIgyoQeQ8kzfYYi7z1VERVS8Fb5es4SnGspyUD1pH7DRIv/F4XVcpYRT6e18I3ZIcka1lwERBTNhseFKIAs7S2H4EsnKkikZhKZLkDNsBi7ja5URWprxpmB/dCtoonhxL4WvQZ5bf55W1Qyk94ZETNAF02v/kNjO2ExWCJDo/I0fXrrW+O8OlvLYDm8jzVoZ6jKh5G5kVB1yrvRNloepldvSyRp17hGOtS1/BgVlSnpCX1EWfBm8qaZsRuJ9i/McI7u8Uz+NE1pvCqD2ewrCSiIal7wWl4RudhnegJ0tjQkwyVY1MEyXD5SRRzhOAy+UjVN9VYSFnyP0gyctBlSAJ0kqjNfEZ6JwxplcBVocWsI8ULjDm1Jnqynqm/B+adr6nfo+Qy7tuOkyuUT0J2M6aYM1U0l6hSeppMqM5xJyxMNGFCH5irUYtBgtaGegEML46e6enslniiZCSc9rLIGnMuRutAnpaSSvDuu0yxJO7WIZkMaU5mS4t2Y3kkszJHQ7kPHhIZyCPEE7TUya7fPMamFDkYI1Uwc7b2VhvMVgj68KYrKkqQsqS0EWtb0WtftSWXU2zhFJR1NGz1QqZJedF++A0MDQeqAoaDHVtL0GQ7YnrhgytP9QOszV45BETZxPxDEYaqsTs5QDbwDsWqLkdW42U0aTJnyITnzdq3s0eB7g7Wgm0ge4h93uXMaix+XQY5l/NntOy0RXrETVSgJWn9SDZt/uiP5TSCyMB9OUdtTesaJzf2ZPbkRuEblsKxm5e/YUKJyoaSyzWDDWmc9l/TejWpCNz6E4S1aOKYSz3oTdehyZTRjSoXX054Scj2lCufBdvodepqtWCIN/ZT2GTevyo3BsbiZRDJTVkynfvDJPSRzZSKZYvIWVlkW9NgUrX3TmI+Ib4VtAZF7kxH+eAsaQVm7tSlWVXs0Xg0drsTwBx3JW15yColazVciw+ihc/NhOtdjpNK4f6jrcCJBSutawfC5R/ioZur2SvwGIss2mcP+PMLI2FteQK2B3t+NeZJrc+00ZLR9DQuu2Fu4ssxT2UXfJZe1Etm51i0p4L2TWbiJxK73mfEtspmbe5evKf1xJXdji4FzCkbGPocW46VENaWl2qg8MrPNxMz6PJ3Z5pBuQ9z0ZcxEF4Y3Y3QQlliUzbyDG3Pjm/ZhKmmm6CkhDpOaCVuGpaQypbli5NndOj9CY++5STb1cK/y5D2owmrMEOmR6j7MorQNa1YCanEtgx5O2vAH8Z8bTqFCmnXIZnZC4D3hgTyT6MYn7U3UP1gC/drBLAN05Co14gLfpFmgzlIrnq0218fzyGir4iEN+rchjGtnmx29DfnPH2ZTl8Ft+u9BZTrBOmNBeI02qKTjWmEX6rHskJKlCTG6nJpSuQXG51Wb9JnPg5udEHjP0DSrTu1a3vakuLgoULP9jFleCTGh1EhqqT7kYpaRJpxsTFSutbu6wFAmo3zGU6pw+Dmbp8KvWfBOCInalPr3SrEMNdXemsW4SSmIQXFmhCRKMjjJx0pb0CjpGldsdaimctkcpc/oeJp87K6JQgyotu6u0vTw03YRo7GSI/fiRp7YsGuZpYKesEpVO2j6dHo7kJ6sXFFUWjOyuSF0ciViSwwzCtl8tYUhmJE05E8tcad8oTWxNjiUQi8tWuFpYDXlSXZgMHJjz/JJSEFc1npvB9KTJ0VZHK0ZyWRuF7p0FHe6Uet2fe3EQ1JW0ypfQaIFyk09bBmSH6Kwg77oPKqtUOxyXud92qmee+EY3XbOabPYczIbh/lUjAlh5tr9sAt36iX88W1Gu+3f220aGdPSuYx6Q4I70ZjsBBCyaFubjANRusa5V1GfvihgtbJTfvHJ+xznt+kYWD0aTI7C1HJJy0rVrmFSSOeTFtXFpi14IyMbuEhnt51HtFLUlSi7XB3SDGj55Y3LhbJI/aD3oaqNsd8sMjMvnFhZWy1WKvuVSnHzdu27V9cBMabjg6PTo/Pgd7vtfCkV01V7YnbUKCr/lF/7j7KDT8fHwUscdmoNm2ok1B3PpDQX5ugMK1ru7JkxF1Z3VFGUu0EWuCbIodWr8ovn3jv/9Px8MDhAGgwGr/Z6o7aotRPk2O0gVlvd3WrOyJaSJvWsIsXjKdNMljJGvm1rs/PTncqqfZGVtWKlt1F+dTCBuE1Nsgu0qFs1/d3e+bhqt48I3ST2KmnyUxBx+2UHO19i9+TKysraGv4xAxMiVlcbpxNghdHg9BYGxYIAAACYSURBVOq68f2Vlc3VIrI+UbF4clKxNWunni2VDILhfOeEfnVzv2wrkkY1l8u13cTnOlqXUt6TBn14J3fZtHlS3L/a2Ssfvdo+GDw/xmf59On54GD71eneztWt+/JWyh5wd7zyU/T8BCmkvW174yHtyl0kbV4dDc4PTjcqkw+8f2pz02CP7NHa/k759Ojo6LS8d7VfXJWs+v8JvwKlMXKMLQAAAABJRU5ErkJggg=="

var garfieldWidth = 100;
var garfieldHeight = 100;
var garfieldPositionX = 10;
var garfieldPositionY = canvas.height - garfieldHeight;
var garfieldSpeed = 10;

function update() {

	// BEGIN UPDATE LOGIC
	//-------------------------------------
	
  if (isKeyDown(LEFT_KEY)) {
		marioPositionX -= marioMoveSpeed;
  }

  if (isKeyDown(RIGHT_KEY)) {
		marioPositionX += marioMoveSpeed;
  }

  if (isKeyDown(UP_KEY)) {
    marioPositionY -= jumpForce;
    jumpForce -= jumpTheKey;
  }

  //wrap character from left to right side of screen
  if (marioPositionX < 0) {
    marioPositionX = canvas.width;
  }

//wrap character from right to letf side of screen
if (marioPositionX > canvas.width) {
    marioPositionX = 0;
}
//apply gravity so the character falls down
  marioPositionY += gravity;

  // stop the character from falling down the screen
  if(marioPositionY > canvas.height - marioHeight) {
    marioPositionY = canvas.height - marioHeight;
    jumpForce = maxJumpForce;
  }



  //TASK: 
  //1 - make garfield move to the right when mario is on the right side of garfield 
  if (marioPositionX > garfieldPositionX + garfieldWidth) {
    garfieldPositionX += garfieldSpeed;
  }
  // - make garfield move to the right when mario is on the left side of goomba 
  if (marioPositionX < garfieldPositionX + garfieldWidth) {
    garfieldPositionX -= garfieldSpeed;
  }


  




	//-------------------------------------
	// END UPDATE LOGIC

	// BEGIN DRAW LOGIC
	//-------------------------------------

	graphics.clearRect(0, 0, canvas.width, canvas.height)

	graphics.drawImage(
		marioTexture,
		marioPositionX, marioPositionY, marioWidth, marioHeight);
  
  graphics.drawImage(
		garfieldTexture,
		garfieldPositionX, garfieldPositionY, garfieldWidth, garfieldHeight);
	//-------------------------------------

	// ask the browser to call the update function again.
	requestAnimationFrame(update)
}


// DO NOT EDIT BELOW THIS LINE
//--------------------------------------------------------------------

var keys = [];
var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;

// check key down events
window.addEventListener('keydown', function (event) {
	keys[event.keyCode] = true;
}, true);

// check key release events
window.addEventListener('keyup', function (event) {
	keys[event.keyCode] = false;
}, true);

function isKeyDown(key) {
	return keys[key];
}

update();
//--------------------------------------------------------------------