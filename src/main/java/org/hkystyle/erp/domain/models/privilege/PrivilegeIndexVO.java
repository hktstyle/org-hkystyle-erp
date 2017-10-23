package org.hkystyle.erp.domain.models.privilege;

import java.io.Serializable;
import java.util.List;

public class PrivilegeIndexVO implements Serializable{
	private static final long serialVersionUID = 1L;
	private String PrivilegeName;
	private String PrivilegeCode;
	private String Sequence;
	private String icon;
	private String url;
	private String privilegeType;
	private String title;

	private List<PrivilegeIndexVO> sonIndex;

	public String getPrivilegeName() {
		return PrivilegeName;
	}

	public void setPrivilegeName(String privilegeName) {
		PrivilegeName = privilegeName;
	}

	public String getPrivilegeCode() {
		return PrivilegeCode;
	}

	public void setPrivilegeCode(String privilegeCode) {
		PrivilegeCode = privilegeCode;
	}

	public String getSequence() {
		return Sequence;
	}

	public void setSequence(String sequence) {
		Sequence = sequence;
	}

	public List<PrivilegeIndexVO> getSonIndex() {
		return sonIndex;
	}

	public void setSonIndex(List<PrivilegeIndexVO> sonIndex) {
		this.sonIndex = sonIndex;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPrivilegeType() {
		return privilegeType;
	}

	public void setPrivilegeType(String privilegeType) {
		this.privilegeType = privilegeType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "PrivilegeIndexVO [PrivilegeName=" + PrivilegeName + ", PrivilegeCode=" + PrivilegeCode + ", Sequence="
				+ Sequence + ", icon=" + icon + ", url=" + url + ", privilegeType=" + privilegeType + ", title=" + title
				+ ", sonIndex=" + sonIndex + "]";
	}

}
