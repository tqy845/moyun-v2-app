/**
 * 用户属性
 * @interface UserProperties 用户属性
 */
export interface UserProperties{
    /**
     * 用户邮箱
     */
    email: string;

    /**
     * 用户密码
     */
    password: string;

    /**
     * 用户名（可选）
     */
    username?: string;

    /**
     * 验证码（可选）
     */
    code?: string;

    /**
     * 用户唯一标识（可选）
     */
    uuid?: string;
}


/**
 * 用户对象
 */
export interface User {

    /**
     * 创建人
     */
    createBy?: string;

    /**
     * 创建时间
     */
    createTime?: string;

    /**
     * 更新人
     */
    updateBy?: string;

    /**
     * 更新时间
     */
    updateTime?: string;

    /**
     * 备注
     */
    remark?: string;

    /**
     * 用户ID
     */
    userId?: number;

    /**
     * 部门ID
     */
    deptId?: number;

    /**
     * 用户名
     */
    userName?: string;

    /**
     * 昵称
     */
    nickName?: string;

    /**
     * 电话号码
     */
    phoneNumber?: string;

    /**
     * 性别
     */
    sex?: string;

    /**
     * 用户头像
     */
    avatar?: string;

    /**
     * 状态
     */
    status?: string;

    /**
     * 删除标志
     */
    delFlag?: string;

    /**
     * 登录IP
     */
    loginIp?: string;

    /**
     * 登录日期
     */
    loginDate?: string;

    /**
     * 部门信息
     */
    dept: {
        createBy?: string;
        createTime?: string;
        updateBy?: string;
        updateTime?: string;
        remark?: string;
        deptId?: number;
        parentId?: number;
        ancestors?: string;
        deptName?: string;
        orderNum?: number;
        leader?: string;
        phone?: string;
        email?: string;
        status?: string;
        delFlag?: string;
        parentName?: string;
        children?: any[];
    };

    /**
     * 用户角色信息
     */
    roles: {
        createBy?: string;
        createTime?: string;
        updateBy?: string;
        updateTime?: string;
        remark?: string;
        roleId?: number;
        roleName?: string;
        roleKey?: string;
        roleSort?: number;
        dataScope?: string;
        menuCheckStrictly?: boolean;
        deptCheckStrictly?: boolean;
        flag?: boolean;
        menuIds?: any[];
        deptIds?: any[];
        permissions?: any[];
        admin?: boolean;
    }[];

    /**
     * 角色IDs
     */
    roleIds?: any[];

    /**
     * 岗位IDs
     */
    postIds?: any[];

    /**
     * 角色ID
     */
    roleId?: any;

    /**
     * 是否为管理员
     */
    admin?: boolean;
}