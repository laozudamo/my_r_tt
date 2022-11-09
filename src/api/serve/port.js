import request from '@/utils/request'

export function getPort(){
    return request({
        url:'/stats/get_port',
        method:'get'
    })
}

// 端口下属CPU可选择的部分
export function getCpuOption(params){
    return request({
        url:'/ports/cpu_cores',
        method:'get',
        params
    })
}

// 绑定端口
export function acquicePort(data){
    return request({
        url:'/ports/ports',
        method:'post',
        data
    })
}
// 解绑端口
export function releasePort(data){
    return request({
        url:'/ports/ports',
        method:'delete',
        data
    })
}
// 解绑端口
export function cpuCorePort(data){
    return request({
        url:'/ports/cpu_cores',
        method:'post',
        data
    })
}
// 获取所有端口
export function getUserPorts(){
    return request({
        url:'/ports/user_ports',
        method:'get',
    })
}