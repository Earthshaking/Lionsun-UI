<%@page import="lisen.stes.commons.systemparams.SystemParams"%>
<%@ page import="com.baidu.ueditor.ActionEnter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	
	String rootPath = application.getRealPath( "/" );//SystemParams.getValue("uploadfilepath");//
	
	String sss = new ActionEnter( request, rootPath ).exec() ;
	System.out.println(rootPath +"  "+sss);
	out.write( sss );
	
%>