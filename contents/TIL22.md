---
date: '2021-09-29'
title: 'TIL22 | OSI 7계층'
categories: ['TIL']
summary: '네트워크 통신이 일어나는 7단계를 의미한다.'
thumbnail: './images/TIL6.png'
---

## OSI 7 계층?

- 네트워크 통신이 일어나는 7단계를 의미한다.

## 목적

- 네트워킹 시스템은 여러 개층으로 분리되어 있고 각 레이어에 하나 이상의 엔티티가 기능을구현하고 있다. 각 엔티티는 자신 아래 계층과만 통신이 가능하고 위에 계층에서 사용할수 있는 기능을 제공하고 있다.

## 기능

### 물리 계층(Physical Layer)

- 네트워크의 기본 네트워크 하드웨어 전송 기술을 이루고, 데이터 구조를 기초로 한다.(필수) 다양한 특징의 하드웨어 기술이 접목되어 있어서 OSI 아키텍처에서 가장 복잡한 계층으로 간주된다.
- 통신 케이블을 통해 전기 신호를 사용하여 비트 스트림을 전송하는 계층이다.

### 데이터 링크 계층(Data Link Layer)

- 데이터 링크 계층은 포인트 투 포인트간 신뢰성있는 전송을 보장하기 위한 계층이다.
- 물리 계층을 통해 송수신되는 정보의 오류와 흐름을 관리하여 안전한 정보의 전달을 수행할 수 있도록 도와주는 역할을 한다.
- MAC 주소 값은 물리적으로 할당 받는데 공장에서 하드웨어를 생산할 때 각인처럼 박히는 것처럼 만들어질때 주소가 정해져서 나온다.
- 네트워크 브릿지나 스위치 등이 이 계층에서 동작하며, 직접 이어진 곳에만 연결할 수 있다.

### 네트워크 계층 (Network Layer)

- 네트워크 계층 혹은 인터넷 레이어 라고 불린다 우리가 알고 있는 IP주소가 여기에 속한다. 데이터를 목적지까지 안전하고 빠르게 경로를 찾아 전송해주는 역할을 한다.
- 라우팅, 흐름 제어, 세그멘테이션(분할, 구분), 오류 제어, 인터넷 네트워킹등을 수행한다.

### 전송 계층 (Transport Layer)

- 전송 계층은 통신을 활성화하기 위한 계층이다.
- 양 끝단의 사용자들이 신뢰성 있는 데이터를 주고 받을 수 있도록 해주어 , 상위 계층들이 데이터 전달의 유효성이나, 효율성을 생각하지 않도록 해준다. 대표적으로 TCP와 UDP가 있다.
- 전송 계층에서는 프로세스간의 전송 기술을 다룬다. 데이터 링크 계층에서는 노드를 다루고, 네트워크 계층에서는 호스트를 구분하고 현재 계층에서는 프로세르를 다룬다. 예시를 들면 네트워크 계층은 아파트 주소와 같고 현재 계층은 아파트의 호수와 같다.
- TCP는 신뢰성있는 통신을 보장한다.
- UDP는 비연결형으로써 신뢰성이 낮고 데이터를 빠르게 전달하는데 초점을 두고 있다.

### 세션 계층 (Session Layer)

- 세션 계층은 양 끝단의 응용 프로세스가 통신을 관리하고 연결을 지속시켜 준다.
- 세션을 만들고 유지하고, 종료하고, 중단 하고 복구등을 한다.
- 동시 송수신 방식, 반이중 방식, 전이중 방식의 통신과 함께 체크 포인팅과 유휴 종료, 다시 시작 과 등을 수행한다.
- TCP/IP 세션을 만들고 없애는 책임을 진다.

### 표현 계층 (Presentation Layer)

- 표현 계층은 응용 계층으로부터 전달받거나 전송하는 데이터의 인코딩 및 디코딩을 해주는 계층이다.

### 응용 계층 (Application Layer)

- 응용 계층은 응용 프로세스와 직접 관계하여 일반적인 응용 서비스를 수행한다.
- 사용자에게 보이는 유일한 계층이다.
- HTTP, FTP, SMTP, NFS, NTP, Telnet등과 같은 프로토콜이 있다.