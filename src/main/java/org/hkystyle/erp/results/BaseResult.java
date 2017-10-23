
package org.hkystyle.erp.results;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by hukaiyang on 2017/10/14.
 */
public class BaseResult implements Serializable {
    public BaseResult() {
        this.success = true;
    }

    /**
     * 调用是否成功
     */
    private boolean success;

    /**
     * 错误消息
     */
    private String message;

    /**
     * 错误详细描述
     */
    private String desc;

    /**
     * 服务器当前时间
     */
    private String serviceTime;

    /**
     * 获取 调用是否成功
     */
    public boolean isSuccess() {
        return this.success;
    }

    /**
     * 设置 调用是否成功
     */
    public void setSuccess(boolean success) {
        this.success = success;
    }

    /**
     * 获取 错误消息
     */
    public String getMessage() {
        return this.message;
    }

    /**
     * 设置 错误消息
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * 获取 错误详细描述
     */
    public String getDesc() {
        return this.desc;
    }

    /**
     * 设置 错误详细描述
     */
    public void setDesc(String desc) {
        this.desc = desc;
    }

    /**
     * 获取 服务器当前时间
     */
    public String getServiceTime() {
        return this.serviceTime;
    }

    /**
     * 设置 服务器当前时间
     */
    public void setServiceTime(String serviceTime) {
        this.serviceTime = serviceTime;
    }
}
